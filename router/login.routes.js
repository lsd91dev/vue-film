const router = require('express').Router();
const { check } = require('express-validator');


/* imports */
const User = require('../models/user.model');
const { checkPassword } = require('../utilities/utilities');
const { validator } = require('../middlewares/user.validator');
const { generateToken } = require('../middlewares/token.validator');

router.post('/', [check('email', 'Email is required').notEmpty(),
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validator
], async(req, res) => {
    const user = req.body;
    try {
        const exist = await User.findOne({ email: user.email });
        if (!exist) {
            return res.status(400).json({
                ok: false,
                errors: {
                    msg: ['Invalid user']
                }
            })
        }
        if (!checkPassword(user.password, exist.password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    msg: ['Invalid user']
                }
            })
        }
        const token = generateToken(exist);
        return res.json({
            ok: true,
            token,
            user
        })
    } catch (error) {
        if (error) {
            return res.status(500).json({
                ok: false,
                errors: {
                    msg: ['Unexpected error. Check logs']
                }
            })
        }
    }
})

module.exports = router;