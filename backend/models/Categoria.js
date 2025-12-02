module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define("Categoria", {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    imagen: DataTypes.TEXT
  });

  Categoria.associate = (models) => {
    Categoria.hasMany(models.Producto, {
      foreignKey: "categoriaId"
    });
  };

  return Categoria;
};