const usersController = require('../controllers/usersController');
const express = require('express');
const router = express.Router();

router.get('/', usersController.inicio);
/* Resitro de usuarios */
router.get('/register', usersController.registro);
router.post('/register', usersController.storage);
router.get('/login', usersController.login);

module.exports = router;