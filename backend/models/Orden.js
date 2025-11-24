module.exports = (sequelize, DataTypes) => {
  const Orden = sequelize.define("Orden", {
    productoId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    estado: DataTypes.STRING
  });

  Orden.associate = (models) => {
    Orden.belongsTo(models.Usuario, {
      foreignKey: "usuarioId"
    });

    Orden.belongsTo(models.Producto, {
      foreignKey: "productoId"
    });
  };

  return Orden;
};
