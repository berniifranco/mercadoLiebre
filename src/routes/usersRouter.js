const usersController = require('../controllers/usersController');
const express = require('express');
const router = express.Router();
const path = require('path')
const { body } = require('express-validator');
const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img'));
    },
    filename: (req, file, cb) => {
        let imageName = 'user-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
});

const upload = multer({storage: diskStorage});

const validate = [
    body('nomape').notEmpty().withMessage('Debes completar el campo nombre').bail(),
    body('email').notEmpty().withMessage('Debes completar el campo Email').isEmail().withMessage('Debes completar el campo con un email valido'),
    body('contra').notEmpty().withMessage('Debbes completar la contraseña'),
    body('confirmar').notEmpty().withMessage('Debbes completar la contraseña confirmada'),
    body('foto').custom((value, { req }) => {
        let file = req.file;
        let accepted = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Debe subir una imágen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!accepted.includes(fileExtension)) {
                throw new Error('Las extenciones permitidas son .jpg, .png y .gif')
            }
        }

        return true;
    })
];

router.get('/', usersController.inicio);
/* Resitro de usuarios */
router.get('/register', usersController.registro);
router.post('/register', upload.single('foto'), validate, usersController.storage);
router.get('/login', usersController.login);

module.exports = router;