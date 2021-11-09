const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const saucesRoutes = require('./routes/sauces');
const path = require('path');
const app = express();

const cors = require('cors');
const sauce = require('./models/sauce');
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://LemKin:KSpro1986@cluster0.najen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;