const { Producto } = require("../models");

const getProductos = async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
};

const getProductoById = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto) return res.status(404).json({ message: "No encontrado" });
  res.json(producto);
};

const createProducto = async (req, res) => {
  const nuevo = await Producto.create(req.body);
  res.status(201).json(nuevo);
};

const updateProducto = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto) return res.status(404).json({ message: "No encontrado" });

  await producto.update(req.body);
  res.json(producto);
};

const deleteProducto = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto) return res.status(404).json({ message: "No encontrado" });

  await producto.destroy();
  res.json({ message: "Eliminado" });
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
