module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define("Categoria", {
    nombre: DataTypes.STRING,
    // AGREGAMOS ESTOS DOS CAMPOS:
    descripcion: DataTypes.STRING,
    imagen: DataTypes.TEXT // Usamos TEXT para soportar Base64 largo
  });

  Categoria.associate = (models) => {
    Categoria.hasMany(models.Producto, {
      foreignKey: "categoriaId"
    });
  };

  return Categoria;
};