require('dotenv').config();
const jwt = require('jsonwebtoken');
const Product = require('../models/sauces');

async function validateId(req, res, next) {
    try {
        const product = await Product.findOne({ _id: req.params.id })
        // recup le token qui identifie
        const token = req.headers.authorization.split(' ')[1];
        // on le décode
        const decodedToken = jwt.verify(token, process.env.JWT_PASSWORD);
        // on recup l'userId du token
        const userId = decodedToken.userId;
        // on compare l'user id de la sauce et de celui du token
        if (product.userId && product.userId === userId) {
            res.status(403).send({ message: 'Requête non autorisée' });
        } else {
            next();
        }
    } catch (error) {
        res.status(401).send({ error })
    }
}

module.exports = { validateId }