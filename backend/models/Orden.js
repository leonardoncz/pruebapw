module.exports = (sequelize, DataTypes) => {
  const Orden = sequelize.define("Orden", {
    fecha: DataTypes.STRING,
    estado: DataTypes.STRING,
    total: DataTypes.DECIMAL(10, 2),
    
    productos: DataTypes.JSON, 
    
    pago: DataTypes.JSON,
    
    usuarioId: DataTypes.INTEGER
  });

  Orden.associate = (models) => {
    Orden.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
      as: "usuario" 
    });
  };

  return Orden;
};