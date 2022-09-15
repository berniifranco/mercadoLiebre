const usersController = require('../controllers/usersController');
const express = require('express');
const router = express.Router();

router.get('/register', usersController.registro);
router.get('/login', usersController.login);

module.exports = router;