var request = require('supertest');
var async = require('async');
var api = require('../../../app.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Test MATERIA', function() {

  var materia;
  var id_materia;

  before(function() {
    materia = {
      "nombre": "Algoritmos y Programación",
      "sigla": "INF-121"
    };
  });

  it('POST /materias', function(done) {
    async.waterfall([
      function createMateria(callback) {
        request.post('/materias')
        .set('Accept', 'application/json')
        .send(materia)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var data = res.body;
        expect(data).to.have.property('id_materia');
        expect(data).to.have.property('nombre', materia.nombre);
        expect(data).to.have.property('sigla', materia.sigla);
        id_materia = data.id_materia;
        done();
      }
    ], done);
  });

  it('DELETE /materias/:id', function(done) {
    async.waterfall([
      function deleteMateria(callback) {
        request.delete('/materias/' + id_materia)
        .set('Accept', 'application/json')
        .expect(204)
        .end(callback);
      },
      function getMateria(res, callback) {
        request.get('/materias/' + id_materia)
        .set('Accept', 'application/json')
        .expect(404)
        .end(callback);
      }
    ], done);
  });

  it('GET /materias', function(done) {
    async.waterfall([
      function createMateria(callback) {
        request.post('/materias')
        .set('Accept', 'application/json')
        .send(materia)
        .end(callback);
      },
      function getMateria(res, callback) {
        id_materia = res.body.id_materia;
        request.get('/materias')
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

  it('GET /materias/:id', function(done) {
    async.waterfall([
      function getMateria(callback) {
        request.get('/materias/' + id_materia)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var data = res.body;
        expect(data).to.have.property('id_materia', id_materia);
        expect(data).to.have.property('nombre', materia.nombre);
        expect(data).to.have.property('sigla', materia.sigla);
        done();
      }
    ], done);
  });

  it('PUT /materias/:id', function(done) {
    var materiaUpdated = {
      "nombre": "Estructura de datos y algoritmos"
    };
    async.waterfall([
      function updateMateria(callback) {
        request.put('/materias/' + id_materia)
        .set('Accept', 'application/json')
        .send(materiaUpdated)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function getMateria(res, callback) {
        request.get('/materias/' + id_materia)
        .set('Accept', 'application/json')
        .end(callback);
      },
      function assertions(res) {
        var data = res.body;
        expect(data).to.have.property('id_materia', id_materia);
        expect(data).to.have.property('nombre', materiaUpdated.nombre);
        expect(data).to.have.property('sigla', materia.sigla);
        done();
      }
    ], done);
  });

  after(function(done) {
    async.waterfall([
      function deleteMateria(callback) {
        request.delete('/materias/' + id_materia).end(callback);
      }
    ], done);
  });

});
