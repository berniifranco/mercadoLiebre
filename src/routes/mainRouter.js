const maincontroller = require('../controllers/mainController');
const express = require('express');
const router = express.Router();

router.get('/', maincontroller.index);
router.get('/ayuda', maincontroller.ayuda);
router.get('/tiendas', maincontroller.tiendas);

module.exports = router;