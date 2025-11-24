module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define("Producto", {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.DECIMAL,
    imagen: DataTypes.STRING,
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
