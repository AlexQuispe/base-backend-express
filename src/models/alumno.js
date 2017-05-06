module.exports = function(sequelize, DataTypes) {
  var alumno = sequelize.define('alumno', {
    id_alumno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.INTEGER,
    }
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    freezeTableName: true
  });
  
  return alumno;
};
