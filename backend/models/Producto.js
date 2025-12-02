module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define("Producto", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    image: DataTypes.TEXT, // URL de la imagen
    
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