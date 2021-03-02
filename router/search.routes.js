/* express */
const { express } = require('../app');
const rp = require('request-promise');
const router = express.Router();


// --- middlewares

const { getUserByToken } = require('../middlewares/token.validator');
const { checkIfQueryIsEmpty } = require('../middlewares/search.validator');

// --- Models

const Review = require('../models/review.model');


// --- environment variables

const tmdb_url = process.env.TMDB_URL;
const tmdb_key = process.env.TMDB_KEY;


router.get('/movie/:query', [checkIfQueryIsEmpty, getUserByToken], async(req, res) => {
    let query = req.params.query;
    rp(`${tmdb_url}/search/movie?api_key=${tmdb_key}&query=${query}&page=1&language=en-US&include_adult=false`, { json: true }).then((data) => {
        if (!data) {
            return res.json({
                ok: false,
                errors: {
                    msg: ['There is no coincidence']
                }
            })
        }
        let movies = data.results;
        let user = req.user;
        if (user) {
            requestReviewUser(user, movies).then((reviews) => {
                requestCastFromMovies(movies).then((credits) => {
                    let movies_and_cast = getCastFromMovieById(movies, credits);
                    let movies_cast_reviews = getReviewFromMovieById(movies_and_cast, reviews);
                    return res.json({
                        ok: true,
                        movies: movies_cast_reviews,
                    })
                }).catch((error) => {
                    console.log(error);
                    return res.status(500).json({
                        ok: false
                    })
                })
            }).catch((error) => {
                console.log(error);
                return res.status(500).json({
                    ok: false
                })
            })
        } else {
            requestCastFromMovies(movies).then((credits) => {
                let movies_and_cast = getCastFromMovieById(movies, credits);
                return res.json({
                    ok: true,
                    movies: movies_and_cast
                })
            })
        }

    }).catch((error) => {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        })
    });
});

const requestCastFromMovies = (movies) => {
    let credits = [];
    movies.forEach((movie) => {
        credits.push(rp(`${tmdb_url}/movie/${movie.id}/credits?api_key=${tmdb_key}&language=en-US`, { json: true }))
    });
    return Promise.all(credits);
}

const requestReviewUser = (user, movies) => {
    let reviews = [];
    if (movies) {
        movies.forEach((movie) => {
            let review = Review.find({ movie_id: movie.id, user_id: user._id });
            reviews.push(review);
        });
    }
    return Promise.all(reviews);
}

const getCastFromMovieById = (movies, credits) => {
    for (movie of movies) {
        for (credit of credits) {
            if (movie.id == credit.id) {
                movie.cast = credit.cast
            }
        }
    }
    return movies;
}

const getReviewFromMovieById = (movies, reviews) => {
    for (movie of movies) {
        reviews.forEach(((review, index) => {
            if (review[index] != undefined) {
                if (movie.id == review[index].movie_id) {
                    movie.review = review;
                }
            }
        }))
    }
    return movies;
}


router.get('/movie/test/:query', [checkIfQueryIsEmpty, getUserByToken], async(req, res) => {});



module.exports = router;