'use strict';

module.exports = function(sequelize, DataTypes) {
  var rol = sequelize.define('rol', {
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['ADMIN', 'USER']]
      }
    },
    descripcion: {
      type: DataTypes.STRING,
    }
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        rol.hasMany(models.rol_ruta, {as: 'rol_ruta', foreignKey: 'id_rol'});
      }
    }
  });
  return rol;
};
