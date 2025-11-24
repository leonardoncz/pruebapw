const { Orden } = require("../models");

const getOrdenes = async (req, res) => {
  const ordenes = await Orden.findAll();
  res.json(ordenes);
};

const createOrden = async (req, res) => {
  const nueva = await Orden.create({
    ...req.body,
    estado: "Pendiente"
  });
  res.status(201).json(nueva);
};

const cancelarOrden = async (req, res) => {
  const orden = await Orden.findByPk(req.params.id);
  if (!orden) return res.status(404).json({ message: "No encontrada" });

  await orden.update({ estado: "Cancelada" });
  res.json(orden);
};

module.exports = { getOrdenes, createOrden, cancelarOrden };
