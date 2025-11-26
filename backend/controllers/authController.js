const { Usuario } = require('../models');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email, password } });

        if (usuario) {
            if (!usuario.activo) return res.status(403).json({ message: "Cuenta desactivada" });
            res.json(usuario);
        } else {
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const registro = async (req, res) => {
    try {
        const { nombre, email, password, pais } = req.body;
        
        const existe = await Usuario.findOne({ where: { email } });
        if (existe) return res.status(400).json({ message: "El email ya existe" });

        const nuevoUsuario = await Usuario.create({
            nombre, email, password, pais, rol: "usuario", activo: true
        });

        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- CORRECCIÓN CLAVE AQUÍ ---
const actualizarPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const { passwordActual, nuevoNombre, nuevoEmail, nuevaPassword } = req.body;
        
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        // Verificar contraseña actual antes de permitir cambios
        if (usuario.password !== passwordActual) {
            return res.status(401).json({ message: "Contraseña actual incorrecta" });
        }

        // Actualizar campos si vienen en el body
        if (nuevoNombre) usuario.nombre = nuevoNombre;
        if (nuevoEmail) usuario.email = nuevoEmail;
        if (nuevaPassword) usuario.password = nuevaPassword;

        await usuario.save(); // Guardar en PostgreSQL

        res.json(usuario); // Devolver el usuario actualizado al frontend
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const verificarEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        if (usuario) res.json({ message: "Existe" });
        else res.status(404).json({ message: "No existe" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const recuperarPassword = async (req, res) => {
    try {
        const { email, nuevaPassword } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        usuario.password = nuevaPassword;
        await usuario.save();

        res.json({ message: "Contraseña actualizada" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { login, registro, actualizarPerfil, verificarEmail, recuperarPassword };