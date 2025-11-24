module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    pais: DataTypes.STRING,
    rol: DataTypes.STRING,
    activo: DataTypes.BOOLEAN
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Orden, {
      foreignKey: "usuarioId"
    });
  };

  return Usuario;
};
