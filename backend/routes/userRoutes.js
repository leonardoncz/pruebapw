const express = require('express');
const router = express.Router();
const { getUsuarios, getUsuarioById, toggleActivo } = require('../controllers/userController');

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.put('/:id/toggle', toggleActivo); // Ruta para activar/desactivar

module.exports = router;