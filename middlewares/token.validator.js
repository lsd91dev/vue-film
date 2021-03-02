const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('authorization');
    jwt.verify(token, process.env.SEED_TOKEN, (error, decoded) => {
        if (error) {
            console.log(error);
            return res.status(401).json({
                ok: false,
                error: {
                    msg: error
                }
            })
        }
        req.user = decoded.payload.user;
        next();
    })
}

const getUserByToken = (req, res, next) => {
    const token = req.header('authorization');
    jwt.verify(token, process.env.SEED_TOKEN, (error, decoded) => {
        if (!error) {
            req.user = decoded.payload.user;
        }
        // console.log(req.user);
        next();
    })
}

const generateToken = (user) => {
    const payload = { user }
    const token = jwt.sign({
        payload
    }, process.env.SEED_TOKEN, { expiresIn: 60 * 60 * 24 * 30 });
    return token;
}

module.exports = { verifyToken, generateToken, getUserByToken };