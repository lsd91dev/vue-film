const Review = require('../models/review.model');

const checkIfReviewExists = async(req, res, next) => {
    let movie_id = req.params.movie_id;
    let user = req.user;
    try {
        let reviewDB = await Review.findOne({ movie_id, user_id: user._id });
        if (!reviewDB) {
            next();
        } else {
            return res.status(400).json({
                ok: false,
                errors: {
                    msg: [`There is a review for existing movie`]
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            errors: {
                msg: [`Unexpected error.`]
            }
        })
    }
}

module.exports = { checkIfReviewExists }