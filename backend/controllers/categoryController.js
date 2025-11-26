const { Categoria, Producto } = require("../models");

const getCategorias = async (req, res) => {
  try {
    // Incluimos los productos asociados para saber cuántos tiene cada categoría
    const categorias = await Categoria.findAll({
        include: [{ model: Producto }] 
    });
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if(categoria) res.json(categoria);
        else res.status(404).json({message: "No encontrada"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const createCategoria = async (req, res) => {
  try {
    const nueva = await Categoria.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategoria = async (req, res) => {
    try {
        await Categoria.update(req.body, { where: { id: req.params.id } });
        const actualizada = await Categoria.findByPk(req.params.id);
        res.json(actualizada);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCategoria = async (req, res) => {
    try {
        await Categoria.destroy({ where: { id: req.params.id } });
        res.json({ message: "Eliminada" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria };