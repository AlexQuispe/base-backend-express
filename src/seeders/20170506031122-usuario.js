'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usuario', [{
      //id_usuario: 1,
      usuario: "admin",
      contrasena: "202cb962ac59075b964b07152d234b70",
      id_rol: 1,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      //id_usuario: 2,
      usuario: "alumno1",
      contrasena: "202cb962ac59075b964b07152d234b70",
      id_rol: 2,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      //id_usuario: 3,
      usuario: "alumno2",
      contrasena: "202cb962ac59075b964b07152d234b70",
      id_rol: 2,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      //id_usuario: 4,
      usuario: "alumno3",
      contrasena: "202cb962ac59075b964b07152d234b70",
      id_rol: 2,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usuario', null, {});
  }
};
