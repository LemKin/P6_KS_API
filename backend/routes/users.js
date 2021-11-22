const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const passwordValidator = require('../config/passwordValidator_config');

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;