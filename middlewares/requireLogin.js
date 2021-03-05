module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send({ error: 'You must log in!'});
    }
};