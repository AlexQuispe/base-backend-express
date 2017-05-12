'use strict';
var request = require('supertest');
var async = require('async');
var server = require('../../../app.js');
var host = process.env.API_TEST_HOST || server;

request = request(host);

describe('Test AUTH login', function() {

  it('POST /auth/login ........ Credenciales correctas', function(done) {
    var credenciales = {
      "usuario": "admin",
      "contrasena": "123"
    };
    async.waterfall([
      function login(callback) {
        request.post('/auth/login')
        .set('Accept', 'application/json')
        .send(credenciales)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var body = res.body;
        expect(body).to.have.property('success', "Ok");
        expect(body).to.have.property('data');
        var data = body.data;
        expect(data).to.have.property('token');
        expect(data).to.have.property('usuario');
        var usuario = data.usuario;
        expect(usuario).to.have.property('id_usuario');
        expect(usuario).to.have.property('id_rol');
        done();
      }
    ], done);
  });

  it('POST /auth/login ........ Credenciales incorrectas', function(done) {
    var credencialesIncorrectas = {
      "usuario": "ADMIN",
      "contrasena": "12345678"
    };
    async.waterfall([
      function login(callback) {
        request.post('/auth/login')
        .set('Accept', 'application/json')
        .send(credencialesIncorrectas)
        .expect(401)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var body = res.body;
        expect(body).to.have.property('success', "Fail");
        expect(body).to.have.property('data');
        var data = body.data;
        expect(data).to.be.a('string');
        done();
      }
    ], done);
  });

  it('POST /auth/login ........ Parámetros incorrectos', function(done) {
    var parametrosIncorrectos = {
      "usuarios": "admin",
      "contraseña": "123"
    };
    async.waterfall([
      function login(callback) {
        request.post('/auth/login')
        .set('Accept', 'application/json')
        .send(parametrosIncorrectos)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var body = res.body;
        expect(body).to.have.property('success', "Fail");
        expect(body).to.have.property('data');
        var data = body.data;
        expect(data).to.be.a('string');
        done();
      }
    ], done);
  });

});
