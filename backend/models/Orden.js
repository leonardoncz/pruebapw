module.exports = (sequelize, DataTypes) => {
  const Orden = sequelize.define("Orden", {
    fecha: DataTypes.STRING,
    estado: DataTypes.STRING,
    total: DataTypes.DECIMAL(10, 2),
    
    // AQUÍ ESTÁ EL TRUCO: Guardamos el array de productos como JSON
    productos: DataTypes.JSON, 
    
    // Guardamos los datos de pago como JSON (¡Solo para este ejercicio educativo!)
    pago: DataTypes.JSON,
    
    usuarioId: DataTypes.INTEGER
  });

  Orden.associate = (models) => {
    Orden.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
      as: "usuario" // Alias para incluirlo fácil en las consultas
    });
  };

  return Orden;
};