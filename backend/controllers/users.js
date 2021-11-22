const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const crypto = require('crypto-js'); //pour chiffrer l'email en cas de piratage de la base de données
const {DEFAULT_TOKEN_KEY} = require('../config/auth');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: crypto.SHA256(req.body.email), //algorithme de hachage sécurisé 256 bits
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  console.log(req.body);
  User.findOne({ email: crypto.SHA256(req.body.email).toString(crypto.enc.Hex) }) //toString pour convertir le tableau renvoyé par crypto en string
          .then(user => {
          if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                  return res.status(401).json({ error: 'Mot de passe incorrect !' });
                  }
                  res.status(200).json({
                      userId: user._id,
                      token: jwt.sign(
                          { userId: user._id },
                          process.env.TOKEN_KEY || DEFAULT_TOKEN_KEY,
                          { expiresIn: '24h' }
                      )
                  });
              })
          .catch(error => res.status(500).json({ error }));
      })
  .catch(error => res.status(500).json({ error }));
};
