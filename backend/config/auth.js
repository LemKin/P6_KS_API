const jwt = require('jsonwebtoken');

const DEFAULT_TOKEN_KEY = 'azertyuiop';

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY || DEFAULT_TOKEN_KEY);
        console.log(decodedToken);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error || 'Requête non authentifiée !' });
    }
};

module.exports.DEFAULT_TOKEN_KEY = DEFAULT_TOKEN_KEY;