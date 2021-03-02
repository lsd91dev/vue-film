/* express */
const { express } = require('../app');
const { check } = require('express-validator');
const router = express.Router();

/* imports */
const User = require('../models/user.model');
const Review = require('../models/review.model');
const { validator, usernameUnique } = require('../middlewares/user.validator');
const { generateToken, verifyToken } = require('../middlewares/token.validator');
const { updateUsernameReview } = require('../utilities/utilities');

router.get('/', [verifyToken], (req, res) => {
    let user = req.user;
    return res.json({
        ok: true,
        user
    });
});

router.get('/profile', [verifyToken], (req, res) => {
    let user = req.user;
    return res.json({
        ok: true,
        user
    });
});

router.put('/profile/update', [verifyToken,
    usernameUnique,
    validator
], async(req, res) => {
    let user = req.user;
    let user_id = user._id;

    // Update only username

    let user_updated = { username: req.body.username }
    try {
        let new_user = await User.findByIdAndUpdate(user_id, user_updated, { new: true });
        let reviews = await Review.find({ user_id: user_id });
        if (updateUsernameReview(reviews, user_updated.username)) {
            let token = generateToken(new_user);
            return res.json({
                ok: true,
                user: new_user,
                token
            })
        } else {
            return res.status(500).json({
                ok: false,
                errors: {
                    msg: [`Could not update the user because there was an error in the server. Please, try again later`]
                }
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            errors: {
                msg: [`Could not update the user because there was an error in the server. Please, try again later`]
            }
        })
    }
});


router.get('/:id', async(req, res) => {
    let id = req.params.id;
    try {
        let user = await User.findById(id);
        return res.json({
            ok: true,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            errors: {
                msg: ['Unexpected errors. Check logs']
            }
        })
    }

});

router.delete('/', [verifyToken], async(req, res) => {
    let user = req.user;
    try {
        await User.findByIdAndDelete(user._id);
        await Review.findOneAndDelete({ user_id: user._id });
        return res.json({
            ok: true
        })
    } catch (error) {
        if (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                error: {
                    msg: [`Unexpected error`]
                }
            })
        }
    }
})


module.exports = router;