const express = require('express');
const router = express.Router();
const { getCategorias, createCategoria } = require('../controllers/categoryController');

router.get('/', getCategorias);
router.post('/', createCategoria);

module.exports = router;