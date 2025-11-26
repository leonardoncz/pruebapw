const { Orden, Usuario } = require("../models");

const getOrdenes = async (req, res) => {
  try {
    // Traemos las órdenes e incluimos los datos del Usuario dueño
    const ordenes = await Orden.findAll({
        include: [{ 
            model: Usuario, 
            as: 'usuario',
            attributes: ['nombre', 'email'] // Solo traemos lo necesario
        }]
    });
    res.json(ordenes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createOrden = async (req, res) => {
  try {
    // El frontend envía: { usuarioId, fecha, productos, total, pago, ... }
    const nuevaOrden = await Orden.create(req.body);
    res.status(201).json(nuevaOrden);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cancelarOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await Orden.findByPk(id);
    
    if (!orden) return res.status(404).json({ message: "Orden no encontrada" });

    orden.estado = "Cancelada";
    await orden.save();

    res.json(orden);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getOrdenes, createOrden, cancelarOrden };