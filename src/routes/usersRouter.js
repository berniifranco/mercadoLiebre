const usersController = require('../controllers/usersController');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const validate = [
    body('nomape').notEmpty().withMessage('Debes completar el campo nombre').bail(),
    body('email').isEmail().withMessage('Debes completar el campo con un email valido'),
    body('contra').notEmpty().withMessage('Debbes completar la contraseña')
];

router.get('/', usersController.inicio);
/* Resitro de usuarios */
router.get('/register', usersController.registro);
router.post('/register', validate , usersController.storage);
router.get('/login', usersController.login);

module.exports = router;