const { Categoria } = require("../models");

const getCategorias = async (req, res) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
};

const createCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nueva = await Categoria.create({ nombre });
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCategorias, createCategoria };