/* express */
const { express } = require('../app');
const rp = require('request-promise');
const { check } = require('express-validator');
const router = express.Router();

/* imports */
const { validator, emailUnique, usernameUnique } = require('../middlewares/user.validator');
const { generateToken, verifyToken } = require('../middlewares/token.validator');

const tmdb_url = process.env.TMDB_URL;
const tmdb_key = process.env.TMDB_KEY;

router.get('/', (req, res) => {
    rp(`${tmdb_url}/movie/now_playing?api_key=${tmdb_key}&language=en-US`, { json: true })
        .then((data) => {
            let movies = data.results;
            return res.json({
                ok: true,
                movies,
            })
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({
                ok: false,
                errors: {
                    msg: [`Unexpected error. Couldn't retrieve data from server`]
                }
            })
        })
});

router.get('/:id', async(req, res) => {
    let id = req.params.id;
    rp(`${tmdb_url}/movie/${id}?api_key=${tmdb_key}`, { json: true })
        .then((movie) => {
            rp(`${tmdb_url}/movie/${movie.id}/credits?api_key=${tmdb_key}&language=en-US`, { json: true }).then((credits) => {
                return res.json({
                    ok: true,
                    movie,
                    credits
                })
            }).catch((error) => {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    errors: {
                        msg: [`Couldn't reach petition. Please try again later`]
                    }
                })
            })
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({
                ok: false,
                errors: {
                    msg: [`Couldn't reach petition. Please try again later`]
                }
            })
        });


});



module.exports = router;