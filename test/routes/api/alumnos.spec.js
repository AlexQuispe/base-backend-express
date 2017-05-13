'use strict';
var request = require('supertest');
var async = require('async');
var server = require('../../../app.js');
var host = process.env.API_TEST_HOST || server;

request = request(host);

describe('Test ALUMNO', function() {

  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ2NDA3MTk2MDgsImp0aSI6ImN0Z3ZkbXlkbmsiLCJleHAiOjE1MjYxNzY3MTk2MDgsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwiaWRfcm9sIjoxfX0.0C0goNQnL3361pU6nUvBQrtKR7kPYSro0c7QNtFpVug';

  it('GET /api/alumnos ............. Obtener alumnos', function(done) {
    async.waterfall([
      function obtenerAlumnos(callback) {
        request.get('/api/alumnos')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function afirmaciones(res) {
        var body = res.body;
        expect(body).to.have.property('success', "Ok");
        expect(body).to.have.property('data');
        var data = body.data;
        expect(data).to.be.a('array');
        done();
      }
    ], done);
  });

  it('GET /api/alumnos/:id ......... Obtener un alumno', function(done) {
    async.waterfall([
      function obtenerAlumno(callback) {
        request.get('/api/alumnos/1')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function afirmaciones(res) {
        var body = res.body;
        expect(body).to.have.property('success', "Ok");
        expect(body).to.have.property('data');
        var data = body.data;
        expect(data).to.have.property('id_alumno', 1);
        expect(data).to.have.property('nombre', 'Juan');
        expect(data).to.have.property('email', 'juan@gmail.com');
        expect(data).to.have.property('telefono', 22654665);
        expect(data).to.have.property('id_usuario', 1);
        done();
      }
    ], done);
  });

  it('POST /api/alumnos ............ Registrar alumno', function(done) {
    var datos =  {
      nombre: "Rosa Flores",
      id_usuario: 4
    }
    async.waterfall([
      function registrarAlumno(callback) {
        request.post('/api/alumnos')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(datos)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function afirmaciones(res) {
        var body = res.body;
        expect(body).to.have.property('success', "Ok");
        expect(body).to.have.property('data');
        var data = body.data;
        expect(data).to.have.property('id_alumno');
        expect(data).to.have.property('nombre', datos.nombre);
        done();
      }
    ], done);
  });

  it('PUT /api/alumnos/:id ......... Actualizar datos', function(done) {
    var datos =  {
      nombre: 'Rosa Flores Flores',
      email: 'rosa@gmail.com',
      telefono: 22765766
    }
    async.waterfall([
      function actualizarDatos(callback) {
        request.put('/api/alumnos/2')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(datos)
        .expect(200)
        .end(callback);
      },
      function revisarActualizacion(res, callback) {
        var body = res.body;
        expect(body).to.have.property('success', "Ok");
        request.get('/api/alumnos/2')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .end(callback);
      },
      function afirmaciones(res) {
        var data = res.body.data;
        expect(data).to.have.property('nombre', 'Rosa Flores Flores');
        expect(data).to.have.property('email', 'rosa@gmail.com');
        expect(data).to.have.property('telefono', 22765766);
        done();
      }
    ], done);
  });

  it('DELETE /api/alumnos/:id ...... Eliminar alumno', function(done) {
    async.waterfall([
      function eliminarDatos(callback) {
        request.delete('/api/alumnos/3')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200)
        .end(callback);
      },
      function revisarEliminacion(res, callback) {
        request.get('/api/alumnos/3')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(404)
        .end(callback);
      }
    ], done);
  });

});
