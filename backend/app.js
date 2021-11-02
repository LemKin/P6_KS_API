const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const sauce = require('./models/sauce');
const port = 3000
const userRoutes = require('./routes/users');
const saucesRoutes = require('./routes/sauces');
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://LemKin:KSpro1986@cluster0.najen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;
