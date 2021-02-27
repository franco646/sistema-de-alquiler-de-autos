const express = require('express');

const router = express.Router();

const authController = require('../controller/auth');

const validateSingup = require('../middleware/singup-validator');
const validateLogin = require('../middleware/login-validator');

router.post('/login', validateLogin, authController.postLogin);

router.post('/signup', validateSingup, authController.postSingup);

module.exports = router;
