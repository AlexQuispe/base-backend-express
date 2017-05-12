'use strict';

module.exports = function(sequelize, DataTypes) {
  var usuario = sequelize.define('usuario', {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 15],
        isAlphanumeric: true
      }
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_rol: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'rol',
        key: 'id_rol'
      }
    }
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        usuario.belongsTo(models.rol, {as: 'rol', foreignKey: 'id_rol'});
      }
    }
  });
  return usuario;
};
