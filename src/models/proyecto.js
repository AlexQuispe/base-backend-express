const { Field } = require('database-handler')

module.exports = (sequelize, Sequelize) => {
  const MODEL = sequelize.define('proyecto', {
    id: Field.INTEGER({
      comment       : 'ID del proyecto.',
      example       : 100,
      allowNull     : false,
      primaryKey    : true,
      autoIncrement : true,
      validate      : { min: 1 },
    }),

    titulo: Field.STRING(500, {
      comment   : 'Título del proyecto.',
      example   : 'Calculadora en JAVA',
      allowNull : false,
      validate  : { len: { args: [1, 500], msg: 'El nombre de usuario debe tener entre 1 y 500 caracteres.' } },
    }),

    descripcion: Field.TEXT({
      comment   : 'Descripción del proyecto.',
      example   : 'Calculadora en JAVA',
      allowNull : false,
    }),

    created_at : Field.DATE({ comment: 'Fecha de creación del registro.' }),
    updated_at : Field.DATE({ comment: 'Fecha de modificación del registro.' }),
    deleted_at : Field.DATE({ comment: 'Fecha de eliminación del registro.' }),
  })

  MODEL.associate = (models) => {}

  return MODEL
}
