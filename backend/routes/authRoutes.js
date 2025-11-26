const express = require('express');
const router = express.Router();
const { login, registro, actualizarPerfil, verificarEmail, recuperarPassword } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', registro);
router.put('/update/:id', actualizarPerfil);
// Agregamos estas rutas nuevas para la recuperación de contraseña
router.post('/check-email', verificarEmail);
router.post('/reset-password', recuperarPassword);

module.exports = router;