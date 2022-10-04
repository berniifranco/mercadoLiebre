const productController = require('../controllers/productController');
const express = require('express');
const path = require('path');
const router = express.Router();
const { body } = require('express-validator');
const uploadFile = require('../middlewares/multerProductsMiddleware');

/* VALIDACIONES */
const validaciones = [
    body('nombre').notEmpty().withMessage('Debe completar el campo Nombre'),
    body('precio').notEmpty().withMessage('Debe completar el campo Precio'),
    body('description').notEmpty().withMessage('Debe completar el campo Descripción'),
    body('cImage').custom((value, { req }) => {
        let file = req.file;
        let accepted = ['.jpg', '.png', '.gif', '.jpeg'];

        if (!file) {
            throw new Error('Tienes que subir una imagen')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!accepted.includes(fileExtension)) {
                throw new Error('Las extenciones permitidas son .jpg, .png y .gif')
            }
        }

        return true;
    })
]

/* LISTADO DE PRODUCTOS*/
router.get('/listado', productController.listado);
/* DETALLE DE PRODUCTO */
router.get('/detalle/:id', productController.detalle);
/* CREAR UN PRODUCTO*/
router.get('/vender', productController.vender);
router.post('/vender', uploadFile.single('cImage'), validaciones, productController.guardar)
/* EDITAR PRODUCTO */
router.get('/editar/:id', productController.editar);
router.put('/editar/:id', productController.update);
/* ELIMINAR UN PRODUCTO */
router.delete('/:id', productController.destroy);

router.get('/compras', productController.compras);
router.get('/ofertas', productController.ofertas);

module.exports = router;