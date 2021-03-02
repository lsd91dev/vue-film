/* express */
const { express } = require('../app');
const { check } = require('express-validator');
const router = express.Router();

/* imports */

const rp = require('request-promise');
const { updateUsernameReview } = require('../utilities/utilities');

/* middlewares */
const { verifyToken, generateToken } = require('../middlewares/token.validator');
const { validator } = require('../middlewares/user.validator');
const { checkIfReviewExists } = require('../middlewares/review.validator');

/* models */
const Review = require('../models/review.model');
const User = require('../models/user.model');


const tmdb_url = process.env.TMDB_URL;
const tmdb_key = process.env.TMDB_KEY;

router.get('/', async(req, res) => {
    try {
        let reviews = await Review.find({}).sort({ created_at: 'desc' });
        getMoviesByMovieId(reviews).then((movies) => {
            const reviews_and_movie_title = getTitleFromMovies(reviews, movies);
            return res.json({
                ok: true,
                reviews: reviews_and_movie_title
            })
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({
                ok: false,
                error: {
                    msg: `Couldn't reach server. Please try again later`
                }
            })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: `Couldn't reach server. Please try again later`
            }
        })
    }

});

// Get review by id

router.get('/:id', async(req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(400).json({
            ok: false,
            error: {
                msg: `Valid id required.`
            }
        })
    }

    try {
        const review = await Review.findById(id);

        rp(`${tmdb_url}/movie/${review.movie_id}?api_key=${tmdb_key}&language=en-US`, { json: true }).then((movie) => {
            review.movie_title = movie.title
            return res.json({
                ok: true,
                review
            })
        }).catch((error) => {
            console.log(error);
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: `No review available for this id`
            }
        })

    }

});

// Get reviews by movie_id

router.get('/for/:movie_id', async(req, res) => {
    let movie_id = req.params.movie_id;
    if (!movie_id) {
        return res.status(400).json({
            ok: false,
            error: {
                msg: `Valid id required.`
            }
        })
    }

    try {
        const reviews = await Review.find({ movie_id: movie_id });
        return res.json({
            ok: true,
            reviews
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: `Couldn't reach petition.`
            }
        })

    }

});

// Get review for movie_id from current user

router.get('/for/:movie_id/user', [verifyToken], async(req, res) => {
    let user = req.user;
    let user_id = user._id;
    let movie_id = req.params.movie_id;
    if (!movie_id) {
        return res.status(400).json({
            ok: false,
            error: {
                msg: `Valid id required.`
            }
        })
    }

    try {
        const review = await Review.find({ movie_id, user_id });
        return res.json({
            ok: true,
            review
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: `Couldn't reach petition.`
            }
        })

    }

});

// create post

router.post('/movie/:movie_id', [
    check('content', 'Content cannot be empty').notEmpty(),
    check('username', 'Username cannot be empty').notEmpty(),
    verifyToken,
    checkIfReviewExists,
    validator,
], async(req, res) => {
    let movie_id = req.params.movie_id;
    let review_user = req.body;
    let user = req.user;
    let review = new Review({
        user_id: user._id,
        username: review_user.username,
        movie_id: movie_id,
        content: review_user.content
    });

    try {
        let token = '';

        // Check if user has change username for update

        if (user.username == null || user.username != review.username) {
            try {
                let user_updated = await User.findByIdAndUpdate({ _id: user._id }, { username: review.username }, { new: true });
                // update all user's username reviews

                let reviews = await Review.find({ user_id: user._id });
                if (updateUsernameReview(reviews, review.username)) {

                    // generate token with updated user

                    token = generateToken(user_updated);
                    let reviewDB = await review.save();
                    return res.json({
                        ok: true,
                        review: reviewDB,
                        token
                    })
                } else {
                    return res.status(500).json({
                        ok: false,
                        error: {
                            msg: [`Your review could not been created because server could not update your user. Please try again later`]
                        }
                    })
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    error: {
                        msg: [`Your review could not been created because server could not update your user. Please, try again later`]
                    }
                })
            }
        } else {
            try {
                let reviewDB = await review.save();
                return res.json({
                    ok: true,
                    review: reviewDB,
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    error: {
                        msg: [`Your review could not been created because server could not save it. Please, try again later`]
                    }
                })
            }

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: ['Unexpected error. Check logs']
            }
        })
    }

});


router.put('/:review_id', [
    check('content', 'Content cannot be empty').notEmpty(),
    check('username', 'Username cannot be empty').notEmpty(), validator, verifyToken
], async(req, res) => {
    let review_id = req.params.review_id;

    let review_user = req.body;
    let user = req.user;

    try {
        let token = '';

        // Check if user has change username for update

        if (user.username == null || user.username != review_user.username) {
            try {
                let user_updated = await User.findByIdAndUpdate({ _id: user._id }, { username: review_user.username }, { new: true });
                // update all user's username reviews

                let reviews = await Review.find({ user_id: user._id });
                if (updateUsernameReview(reviews, review_user.username)) {

                    // generate token with updated user

                    token = generateToken(user_updated);
                    let reviewDB = await Review.findByIdAndUpdate(review_id, review_user, { new: true });
                    return res.json({
                        ok: true,
                        review: reviewDB,
                        token
                    })
                } else {
                    return res.status(500).json({
                        ok: false,
                        msg: [`Your review could not been updated because server could not update your user. Please try again later`]
                    })
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    error: {
                        msg: [`Your review could not been updated because server could not update your user. Please, try again later`]
                    }
                })
            }
        } else {
            try {
                let reviewDB = await Review.findByIdAndUpdate(review_id, review_user, { new: true });
                return res.json({
                    ok: true,
                    review: reviewDB,
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    error: {
                        msg: [`Your review could not been updated because server could not save it. Please, try again later`]
                    }
                })
            }

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: ['Unexpected error. Check logs']
            }
        })
    }
});

router.delete('/:review_id', async(req, res) => {
    let review_id = req.params.review_id;
    try {
        let reviewDB = await Review.findByIdAndDelete(review_id);
        if (reviewDB) {
            return res.json({
                ok: true
            });
        } else {
            return res.status(400).json({
                ok: false,
                error: {
                    msg: [`Review not available. Could not get removed`]
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: ['Unexpected error']
            }
        })
    }
})


const getMoviesByMovieId = (reviews) => {
    let titles = [];
    reviews.forEach((review) => {
        titles.push(rp(`${tmdb_url}/movie/${review.movie_id}?api_key=${tmdb_key}&language=en-US`, { json: true }));
    });
    return Promise.all(titles);
}

const getTitleFromMovies = (reviews, movies) => {
    for (review of reviews) {
        for (movie of movies) {
            if (review.movie_id == movie.id) {
                review.movie_title = movie.original_title
            }
        }
    }
    return reviews;
}





module.exports = router;