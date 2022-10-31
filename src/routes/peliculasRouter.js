const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculasController');

router.get('/', peliculasController.list);
router.get('/:id', peliculasController.detail);

module.exports = router;