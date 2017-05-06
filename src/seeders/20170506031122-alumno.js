module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('alumno', [{
      nombre: 'Juan',
      email: 'juan@gmail.com',
      telefono: 11111111,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      nombre: 'rosa',
      email: 'rosa@gmail.com',
      telefono: 22222222,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      nombre: 'ana',
      email: 'ana@gmail.com',
      telefono: 33333333,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('alumno', null, {});
  }
};
