const checkIfQueryIsEmpty = (req, res, next) => {
    let query = req.params.query;
    if (!query) {
        return res.status(404).json({
            ok: false,
            error: {
                msg: 'Query cannot be empty'
            }
        })
    }
    next();
}

module.exports = { checkIfQueryIsEmpty }