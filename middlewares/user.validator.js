const User = require('../models/user.model');

const { msgError } = require('../utilities/utilities');
const { validationResult } = require('express-validator');

const emailUnique = async(req, res, next) => {
    let userEmail = req.body.email;
    try {
        const user = await User.findOne({ email: userEmail });
        if (user) {
            let email = msgError(userEmail, 'The email address is already being used', 'email');
            return res.status(400).json({
                ok: false,
                errors: {
                    email
                }
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: 'Unexpected error. Check logs'
            }
        })
    }

}

const usernameUnique = async(req, res, next) => {
    let usernameUser = req.body.username;
    const user = await User.findOne({ username: usernameUser });
    if (user) {
        let username = msgError(usernameUser, 'The username is already being used', 'username');
        return res.status(400).json({
            ok: false,
            errors: {
                username
            }
        })
    }
    next();
}



const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
}

module.exports = { validator, emailUnique, usernameUnique }