'use strict';
var request = require('supertest');
var async = require('async');
var api = require('../../../app.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Test MATERIA', function() {

  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ1NTEwMzcxMzksImp0aSI6Im95emZxMmFycHciLCJleHAiOjE0OTQ2Mzc0MzcxMzksImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwiaWRfcm9sIjoxfX0.qVBkuM6blzw3MHUPwVLgfolOQiX1VKba6U_vOu_hBkk';

  it('GET /api/materias ............. Obtener materias', function(done) {
    async.waterfall([
      function getMateria(callback) {
        request.get('/api/materias')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var body = res.body;
        expect(body).to.have.property('success', "Ok");
        expect(body).to.have.property('data');
        var data = body.data;
        expect(data).to.be.a('array');
        done();
      }
    ], done);
  });

  it('GET /api/materias/:id ......... Obtener una materia', function(done) {
    async.waterfall([
      function getMateria(callback) {
        request.get('/api/materias/2')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var body = res.body;
        expect(body).to.have.property('success', "Ok");
        expect(body).to.have.property('data');
        var data = body.data;
        expect(data).to.have.property('id_materia', 2);
        expect(data).to.have.property('nombre', 'Assembler');
        expect(data).to.have.property('sigla', 'INF-153');
        done();
      }
    ], done);
  });

  it('POST /api/materias ............ Registrar una materia', function(done) {
    var datos = {
      "nombre": "Algoritmos y Programación",
      "sigla": "INF-121"
    };
    async.waterfall([
      function createMateria(callback) {
        request.post('/api/materias')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(datos)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var body = res.body;
        expect(body).to.have.property('success', "Ok");
        expect(body).to.have.property('data');
        var data = body.data;
        expect(data).to.have.property('id_materia');
        expect(data).to.have.property('nombre', datos.nombre);
        expect(data).to.have.property('sigla', datos.sigla);
        done();
      }
    ], done);
  });

  it('PUT /api/materias/:id ......... Actualizar datos', function(done) {
    var datos = {
      "nombre": "Estructura de datos y algoritmos"
    };
    async.waterfall([
      function updateMateria(callback) {
        request.put('/api/materias/2')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(datos)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function getMateria(res, callback) {
        request.get('/api/materias/2')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .end(callback);
      },
      function assertions(res) {
        var body = res.body;
        expect(body).to.have.property('success', "Ok");
        expect(body).to.have.property('data');
        var data = body.data;
        expect(data).to.have.property('id_materia');
        expect(data).to.have.property('nombre', datos.nombre);
        done();
      }
    ], done);
  });

  it('DELETE /api/materias/:id ...... Eliminar materia', function(done) {
    async.waterfall([
      function deleteMateria(callback) {
        request.delete('/api/materias/4')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200)
        .end(callback);
      },
      function getMateria(res, callback) {
        request.get('/api/materias/4')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(404)
        .end(callback);
      }
    ], done);
  });

});
