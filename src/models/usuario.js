const { Field } = require('database-handler')

module.exports = (sequelize, Sequelize) => {
  const MODEL = sequelize.define('usuario', {
    id: Field.INTEGER({
      comment       : 'ID del usuario.',
      example       : 100,
      allowNull     : false,
      primaryKey    : true,
      autoIncrement : true,
      validate      : { min: 1 },
    }),

    username: Field.STRING(100, {
      comment   : 'Nombre de usuario.',
      example   : 'admin',
      allowNull : false,
      validate  : { len: { args: [3, 100], msg: 'El nombre de usuario debe tener entre 3 y 100 caracteres.' } },
    }),

    password: Field.STRING(50, {
      comment   : 'Contraseña de usuario.',
      example   : '123456',
      allowNull : false,
      validate  : { len: { args: [3, 50], msg: 'La contraseña debe tener entre 3 y 50 caracteres.' } },
    }),

    nombre: Field.STRING({
      comment : 'Nombre del usuario.',
      example : 'John Smith',
    }),

    email: Field.STRING({
      comment  : 'Dirección de correo electrónico',
      example  : 'alguien@example.com',
      validate : { isEmail: true },
    }),

    estado: Field.ENUM(['ACTIVO', 'INACTIVO', 'ELIMINADO'], {
      comment      : 'Estado en el que se encuentra el registro.',
      defaultValue : 'ACTIVO',
    }),

    rol: Field.ENUM(['admin', 'user'], {
      comment      : 'Rol del usuario.',
      defaultValue : 'admin',
    }),

    created_at : Field.DATE({ comment: 'Fecha de creación del registro.' }),
    updated_at : Field.DATE({ comment: 'Fecha de modificación del registro.' }),
    deleted_at : Field.DATE({ comment: 'Fecha de eliminación del registro.' }),
  })

  MODEL.associate = (models) => {}

  return MODEL
}
