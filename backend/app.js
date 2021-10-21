const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const userRoutes = require('./routes/users');
const saucesRoutes = require('./routes/sauces');
app.use(express.json());
app.use(cors());


app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);


module.exports = app;
