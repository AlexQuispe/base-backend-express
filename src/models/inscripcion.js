'use strict';

module.exports = function(sequelize, DataTypes) {
  var inscripcion = sequelize.define('inscripcion', {
    id_inscripcion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_inscripcion: {
      type: DataTypes.DATE,
    },
    id_alumno: {
      type: DataTypes.INTEGER,
      references: {
        model: 'alumno',
        key: 'id_alumno'
      }
    },
    id_materia: {
      type: DataTypes.INTEGER,
      references: {
        model: 'materia',
        key: 'id_materia'
      }
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    freezeTableName: true
  });
  return inscripcion;
};
