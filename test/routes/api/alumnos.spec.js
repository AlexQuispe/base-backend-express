'use strict';
var request = require('supertest');
var async = require('async');
var api = require('../../../app.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Test ALUMNO', function() {

  var alumno;
  var id_alumno;

  before(function() {
    alumno = {
      "nombre": "Lucy",
      "email": "lucy@gmail.com",
      "telefono": 11111111
    };
  });

  it('POST /alumnos', function(done) {
    async.waterfall([
      function createAlumno(callback) {
        request.post('/alumnos')
        .set('Accept', 'application/json')
        .send(alumno)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var data = res.body;
        expect(data).to.have.property('id_alumno');
        expect(data).to.have.property('nombre', alumno.nombre);
        expect(data).to.have.property('email', alumno.email);
        expect(data).to.have.property('telefono', alumno.telefono);
        id_alumno = data.id_alumno;
        done();
      }
    ], done);
  });

  it('DELETE /alumnos/:id', function(done) {
    async.waterfall([
      function deleteAlumno(callback) {
        request.delete('/alumnos/' + id_alumno)
        .set('Accept', 'application/json')
        .expect(204)
        .end(callback);
      },
      function getAlumno(res, callback) {
        request.get('/alumnos/' + id_alumno)
        .set('Accept', 'application/json')
        .expect(404)
        .end(callback);
      }
    ], done);
  });

  it('GET /alumnos', function(done) {
    async.waterfall([
      function createAlumno(callback) {
        request.post('/alumnos')
        .set('Accept', 'application/json')
        .send(alumno)
        .end(callback);
      },
      function getAlumno(res, callback) {
        id_alumno = res.body.id_alumno;
        request.get('/alumnos')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var data = res.body;
        expect(data).to.be.a('array');
        expect(data.length).to.be.above(0); // array.legth >= 1
        done();
      }
    ], done);
  });

  it('GET /alumnos/:id', function(done) {
    async.waterfall([
      function getAlumno(callback) {
        request.get('/alumnos/' + id_alumno)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var data = res.body;
        expect(data).to.have.property('id_alumno', id_alumno);
        expect(data).to.have.property('nombre', alumno.nombre);
        expect(data).to.have.property('email', alumno.email);
        expect(data).to.have.property('telefono', alumno.telefono);
        done();
      }
    ], done);
  });

  it('PUT /alumnos/:id', function(done) {
    var alumnoUpdated = {
      "nombre": "Daisy"
    };
    async.waterfall([
      function updateAlumno(callback) {
        request.put('/alumnos/' + id_alumno)
        .set('Accept', 'application/json')
        .send(alumnoUpdated)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function getAlumno(res, callback) {
        request.get('/alumnos/' + id_alumno)
        .set('Accept', 'application/json')
        .end(callback);
      },
      function assertions(res) {
        var data = res.body;
        expect(data).to.have.property('id_alumno', id_alumno);
        expect(data).to.have.property('nombre', alumnoUpdated.nombre);
        expect(data).to.have.property('email', alumno.email);
        expect(data).to.have.property('telefono', alumno.telefono);
        done();
      }
    ], done);
  });

  after(function(done) {
    async.waterfall([
      function deleteAlumno(callback) {
        request.delete('/alumnos/' + id_alumno).end(callback);
      }
    ], done);
  });

});
