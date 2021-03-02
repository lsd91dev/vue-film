/* express */
const { express } = require('../app');
const { check } = require('express-validator');
const router = express.Router();

/* imports */
const User = require('../models/user.model');
const { hashPassword, checkPassword } = require('../utilities/utilities');
const { validator, emailUnique, usernameUnique } = require('../middlewares/user.validator');
const { generateToken, verifyToken } = require('../middlewares/token.validator');

router.post('/', [check('email', 'Email is required').notEmpty(),
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password is required').notEmpty(),
    emailUnique,
    validator
], async(req, res) => {
    req.body.password = hashPassword(req.body.password);
    const user = new User(req.body);
    try {
        await user.save();
        const token = generateToken(user);
        return res.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            errors: {
                msg: 'Unexpected error. Check logs'
            }
        })
    }


});



module.exports = router;