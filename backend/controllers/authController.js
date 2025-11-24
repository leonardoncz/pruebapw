const { Usuario } = require("../models");

const login = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ where: { email, password } });

  if (!usuario)
    return res.status(401).json({ message: "Credenciales inválidas" });

  if (!usuario.activo)
    return res.status(403).json({ message: "Cuenta desactivada" });

  res.json(usuario);
};

const registro = async (req, res) => {
  try {
    const { nombre, email, password, pais } = req.body;

    const existente = await Usuario.findOne({ where: { email } });
    if (existente)
      return res.status(400).json({ message: "El email ya existe" });

    const nuevo = await Usuario.create({
      nombre,
      email,
      password,
      pais,
      rol: "usuario",
      activo: true
    });

    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarPerfil = async (req, res) => {
  const { id } = req.params;
  const { passwordActual, nuevoNombre, nuevoEmail, nuevaPassword } = req.body;

  const usuario = await Usuario.findByPk(id);
  if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

  if (usuario.password !== passwordActual)
    return res.status(401).json({ message: "Contraseña incorrecta" });

  await usuario.update({
    nombre: nuevoNombre || usuario.nombre,
    email: nuevoEmail || usuario.email,
    password: nuevaPassword || usuario.password
  });

  res.json(usuario);
};

module.exports = { login, registro, actualizarPerfil };
