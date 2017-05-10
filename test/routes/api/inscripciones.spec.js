'use strict';
var request = require('supertest');
var async = require('async');
var api = require('../../../app.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Test INSCRIPCION', function() {

  var alumno;
  var id_alumno = 999;
  var materia;
  var id_materia = 999;
  var inscripcion;
  var id_inscripcion;

  before(function() {
    alumno = {
      "id_alumno": id_alumno,
      "nombre": "Lucy",
      "email": "lucy@gmail.com",
      "telefono": 11111111
    };
    materia = {
      "id_materia": id_materia,
      "nombre": "Algoritmos y Programación",
      "sigla": "INF-121"
    };
    inscripcion = {
      "fecha_inscripcion": "2015-03-05T00:00:00.000Z",
      "id_alumno": id_alumno,
      "id_materia": id_materia
    };
  });

  it('POST /inscripciones', function(done) {
    async.waterfall([
      function createAlumno(callback) {
        request.post('/alumnos')
        .set('Accept', 'application/json')
        .send(alumno)
        .end(callback);
      },
      function createMateria(res, callback) {
        request.post('/materias')
        .set('Accept', 'application/json')
        .send(materia)
        .end(callback);
      },
      function createInscripcion(res, callback) {
        request.post('/inscripciones')
        .set('Accept', 'application/json')
        .send(inscripcion)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var data = res.body;
        expect(data).to.have.property('id_inscripcion');
        expect(data).to.have.property('fecha_inscripcion', inscripcion.fecha_inscripcion);
        expect(data).to.have.property('id_alumno', inscripcion.id_alumno);
        expect(data).to.have.property('id_materia', inscripcion.id_materia);
        id_inscripcion = data.id_inscripcion;
        done();
      }
    ], done);
  });

  it('DELETE /inscripciones/:id', function(done) {
    async.waterfall([
      function deleteInscripcion(callback) {
        request.delete('/inscripciones/' + id_inscripcion)
        .set('Accept', 'application/json')
        .expect(204)
        .end(callback);
      },
      function getInscripcion(res, callback) {
        request.get('/inscripcion/' + id_inscripcion)
        .set('Accept', 'application/json')
        .expect(404)
        .end(callback);
      }
    ], done);
  });

  after(function(done) {
    async.waterfall([
      function deleteAlumno(callback) {
        request.delete('/alumnos/' + id_alumno).end(callback);
      },
      function deleteMateria(res, callback) {
        request.delete('/materias/' + id_materia).end(callback);
      }
    ], done);
  });

});
