const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculasController');

router.get('/', peliculasController.list);
router.get('/drama', peliculasController.drama);
router.get('/top', peliculasController.top)
router.get('/:id', peliculasController.detail);

module.exports = router;