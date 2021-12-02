const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const crypto = require('crypto-js'); //pour chiffrer l'email en cas de piratage de la base de données
const {DEFAULT_TOKEN_KEY} = require('../config/auth');


// Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    // hashage du mot de passe par Bcrypt
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      // enregistrement des données de l'utilisateur
      const user = new User({
        email: crypto.SHA256(req.body.email), //algorithme de chiffrement sécurisé 256 bits
        password: hash
      });
      // Verification des enregistrements cryptés
      console.log("Voici l'email encrypté : ", crypto.SHA256(req.body.email));
      console.log("Voici le mot de passe hashé : ", hash);
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error: 'Utilisateur non créé...' }));
    })
    .catch(error => res.status(500).json({ error: 'Utilisateur non créé...' }));
};

// Récupération d'un utilisateur déja existant dans la base de donnée
exports.login = (req, res, next) => {
  console.log(req.body);
  // comparer l'émail chiffré avec celui de la base de donnée
  User.findOne({ email: crypto.SHA256(req.body.email).toString(crypto.enc.Hex) }) //toString pour convertir le tableau renvoyé par crypto en string
          .then(user => {
          if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          // bcrypt compare ici le hashage du mot de passe
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                  return res.status(401).json({ error: 'Identifiant ou Mot de Passe incorrect !' });
                  }
                  res.status(200).json({
                      userId: user._id,
                      token: jwt.sign(
                          // attribution du token d'authentification qui durera 24h
                          { userId: user._id },
                          process.env.TOKEN_KEY || DEFAULT_TOKEN_KEY,
                          { expiresIn: '24h' }
                      )
                  });
              })
          .catch(error => res.status(500).json({ error: 'Identifiant ou Mot de Passe incorrect !' }));
      })

  .catch((error)=>{
    res.status(500).json({ error })
  });

};
