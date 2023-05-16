const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ', )[1]
        if(!jwt) {
            res.status(401).json({message: "User doesn\'t authorization"})
        }
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (e) {
        res.status(401).json({message: "User doesn\'t authorization"})
    }
}