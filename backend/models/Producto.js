module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define("Producto", {
    // CAMBIO: Usamos los nombres en inglés que espera el Frontend
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL(10, 2), // Mejor precisión para dinero
      allowNull: false
    },
    image: DataTypes.TEXT, // URL de la imagen
    
    // AGREGAMOS LOS QUE FALTABAN
    type: DataTypes.STRING,  // Ej: "Perro"
    breed: DataTypes.STRING, // Ej: "Golden"
    edad: DataTypes.STRING,  // Ej: "2 años"
    
    // Llave foránea
    categoriaId: DataTypes.INTEGER
  });

  Producto.associate = (models) => {
    Producto.belongsTo(models.Categoria, {
      foreignKey: "categoriaId"
    });
    
    Producto.hasMany(models.Orden, {
      foreignKey: "productoId"
    });
  };

  return Producto;
};