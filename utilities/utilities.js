const bcrypt = require('bcrypt');

const msgError = (value, msg, param) => {
    return {
        value,
        msg,
        param
    }
}

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    return bcrypt.hashSync(password, salt);
}

const checkPassword = (userPassword, dbPassword) => {
    return bcrypt.compareSync(userPassword, dbPassword);
}


const updateUsernameReview = (reviews, updatedUsername) => {
    reviews.forEach(async(review) => {
        review.username = updatedUsername;
        try {
            await review.save();
        } catch (error) {
            console.log(error);
            return false;
        }
    })
    return true;
}

module.exports = { msgError, hashPassword, checkPassword, updateUsernameReview }