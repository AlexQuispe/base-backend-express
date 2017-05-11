'use strict';

module.exports = function(sequelize, DataTypes) {
  var ruta = sequelize.define('ruta', {
    id_ruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING
    },
    access_get: {
      type: DataTypes.BOOLEAN
    },
    access_post: {
      type: DataTypes.BOOLEAN
    },
    access_put: {
      type: DataTypes.BOOLEAN
    },
    access_delete: {
      type: DataTypes.BOOLEAN
    }
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        ruta.hasMany(models.rol_ruta, {as: 'rol_ruta', foreignKey: 'id_ruta'});
      }
    }
  });
  return ruta;
};
