const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = async (req, res) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10) //10 = nb de rounds 

      const user = {
        email: req.body.email,
        password: hash
      }
      console.log(user);
      res.status(201).json({
        message : "Votre compte à été créé"
        })
    } catch (error) {
      res.status(500).json({ error })
    }
};

exports.login = (req, res, next) => {
    console.log(req.body)
    res.status(200).send({
    message : "Votre compte à été créé"
  })
};

