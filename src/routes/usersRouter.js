const usersController = require('../controllers/usersController');
const express = require('express');
const router = express.Router();
const path = require('path');
const { body } = require('express-validator');
const upload = require('../middlewares/multerUsersMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const logueado = require('../middlewares/logueadoMiddleware');

const validateRegister = [
    body('nomape').notEmpty().withMessage('Debes completar el campo nombre').bail(),
    body('nomusu').notEmpty().withMessage('Debes completar el usuario'),
    body('email').notEmpty().withMessage('Debes completar el campo Email').isEmail().withMessage('Debes completar el campo con un email valido'),
    body('contra').notEmpty().withMessage('Debbes completar la contraseña').isLength({min: 4}).withMessage('La contraseña debe tener minimo 4 caracteres'),
    body('confirmar').notEmpty().withMessage('Debbes confirmar la contraseña'),
    body('foto').custom((value, { req }) => {
        let file = req.file;
        let accepted = ['.jpg', '.png', '.gif', '.jpeg'];

        if (!file) {
            throw new Error('Debe subir una imágen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!accepted.includes(fileExtension)) {
                throw new Error('Las extenciones permitidas son .jpg, .jpeg .png y .gif')
            }
        }

        return true;
    })
];

let validacionesLogin = [
    body('nomusu').notEmpty().withMessage('Debes completar este campo'),
    body('contra').notEmpty().withMessage('Debes completar este campo')
];

router.get('/', authMiddleware, usersController.inicio);

/*** DETALLE DE USUARIO ***/
router.get('/detail/:id', usersController.detail);

/*** EDITAR USUARIO ***/
router.get('/edit/:id', usersController.edit);
router.put('/edit/:id', usersController.update);

/*** BORRAR USUARIO ***/
router.delete('/:id', usersController.destroy);

/* Resitro de usuarios */
router.get('/register', guestMiddleware, usersController.registro);
router.post('/register', upload.single('foto'), validateRegister, usersController.storage);

/*** LOGIN DE USUARIO ***/
router.get('/login', logueado, usersController.login);
router.post('/login', validacionesLogin, usersController.procesoLogin);

/*** LOGOUT DE USUARIO ***/
router.get('/logout', authMiddleware, usersController.logout);

module.exports = router;