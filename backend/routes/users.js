const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const passwordValidator = require('../config/passwordValidator_config');
const rateLimit = require("express-rate-limit");

router.post('/signup', passwordValidator, userCtrl.signup);
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 3 essais
    message: {message: "Platiste !!!"}
  });
router.post('/login', loginLimiter, userCtrl.login);

module.exports = router;