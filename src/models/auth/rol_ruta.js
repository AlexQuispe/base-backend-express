'use strict';

module.exports = function(sequelize, DataTypes) {
  var rol_ruta = sequelize.define('rol_ruta', {
    id_rol_ruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rol',
        key: 'id_rol'
      }
    },
    id_ruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ruta',
        key: 'id_ruta'
      }
    }
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        rol_ruta.belongsTo(models.ruta, {as: 'ruta', foreignKey: 'id_ruta'});
        rol_ruta.belongsTo(models.rol, {as: 'rol', foreignKey: 'id_rol'});
      }
    }
  });
  return rol_ruta;
};
