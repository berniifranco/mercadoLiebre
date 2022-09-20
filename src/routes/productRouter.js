const productController = require('../controllers/productController');
const express = require('express');
const { Router } = require('express');
const router = express.Router();

router.get('/detalle/:id', productController.detalle);
/* EDITAR PRODUCTO */
router.get('/editar/:id', productController.editar);
router.put('/editar/:id', productController.update);
/* ELIMINAR UN PRODUCTO */
router.delete('/:id', productController.destroy);
router.get('/compras', productController.compras);
router.get('/ofertas', productController.ofertas);
router.get('/vender', productController.vender);

module.exports = router;