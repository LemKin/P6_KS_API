const express = require('express'); // import express: node.js web framework
const mongoose = require('mongoose'); // import mongoose: un outil de modélisation d'objets MongoDB, conçu pour fonctionner dans un environnement asynchrone. MDB supporte à la fois le promises et callbacks
const userRoutes = require('./routes/users');
const saucesRoutes = require('./routes/sauces');
const path = require('path'); // import path : permet de travailler avec les répertoires et les chemins de fichiers
const app = express();

const cors = require('cors'); // import cors : gérer le partage de ressources d’origine croisée (cross-origin)
const sauce = require('./models/sauce');
const port = 3000;

app.use(cors());
app.use(express.json());

//lien MongoDB
mongoose.connect('mongodb+srv://LemKin:KSpro1986@cluster0.najen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes auth et sauces
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;