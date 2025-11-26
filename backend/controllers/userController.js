const { Usuario } = require("../models");

const getUsuarios = async (req, res) => {
  try {
    // Traemos todos los usuarios (excepto sus contraseñas por seguridad)
    const usuarios = await Usuario.findAll({
        attributes: { exclude: ['password'] } 
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });
        if(usuario) res.json(usuario);
        else res.status(404).json({message: "Usuario no encontrado"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const toggleActivo = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    // Invertimos el estado (si era true pasa a false)
    usuario.activo = !usuario.activo;
    await usuario.save();

    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsuarios, getUsuarioById, toggleActivo };