module.exports = (req, res, next) => {
    if (req.user.credits > 0) {
        next();
    } else {
        res.status(403).send({ error: 'Not enough credits!'});
    }
};