const productController = require('../controllers/productController');
const express = require('express');
const router = express.Router();

router.get('/detalle/:id', productController.detalle);
router.get('/compras', productController.compras);
router.get('/ofertas', productController.ofertas);
router.get('/vender', productController.vender);

module.exports = router;