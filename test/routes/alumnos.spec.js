var request = require('supertest');
var async = require('async');
var api = require('../../app.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('POST /alumnos', function() {
  it('debería crear un alumno', function(done) {
    var data = {
      "nombre": "Lucy",
      "email": "lucy@gmail.com",
      "telefono": 11111111
    };
    request
    .post('/alumnos')
    .set('Accept', 'application/json')
    .send(data)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .end(function(err, res) {
      var alumno = res.body;
      expect(alumno).to.have.property('id_alumno');
      expect(alumno).to.have.property('nombre','Lucy');
      expect(alumno).to.have.property('email','lucy@gmail.com');
      expect(alumno).to.have.property('telefono',11111111);
      done(err);
    });
  });
});

describe('GET /alumnos', function() {
  it('debería obtener una lista de todos los alumnos', function(done) {
    var data1 = {
      "nombre": "Lucy",
      "email": "lucy@gmail.com",
      "telefono": 11111111
    };
    var data2 = {
      "nombre": "Ana",
      "email": "ana@gmail.com",
      "telefono": 22222222
    };
    async.waterfall([
      function createAlumno(callback) {
        request.post('/alumnos')
        .set('Accept', 'application/json')
        .send(data1)
        .end(callback);
      },
      function createAlumno(res, callback) {
        request.post('/alumnos')
        .set('Accept', 'application/json')
        .send(data2)
        .end(callback);
      },
      function getAlumno(res, callback) {
        request.get('/alumnos')
        .set('Accept', 'application/json')
        .send()
        .end(callback);
      },
      function assertions(res) {
        var alumnos = res.body;
        expect(alumnos).to.be.a('array');
        expect(alumnos.length).to.be.above(1); // array.legth >= 2
        done();
      }
    ], done);
  });
});

describe('GET /alumnos/:id', function() {
  it('debería obtener un alumno', function(done) {
    var data = {
      "nombre": "Lucy",
      "email": "lucy@gmail.com",
      "telefono": 11111111
    };
    var id;
    async.waterfall([
      function createAlumno(callback) {
        request.post('/alumnos')
        .set('Accept', 'application/json')
        .send(data)
        .end(callback);
      },
      function getAlumno(res, callback) {
        var alumno = res.body;
        id = alumno.id_alumno;
        request.get('/alumnos/' + id)
        .set('Accept', 'application/json')
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function assertions(res) {
        var alumno = res.body;
        expect(alumno).to.have.property('id_alumno', id);
        expect(alumno).to.have.property('nombre', "Lucy");
        expect(alumno).to.have.property('email', "lucy@gmail.com");
        expect(alumno).to.have.property('telefono', 11111111);
        done();
      }
    ], done);
  });
});

describe('PUT /alumnos/:id', function() {
  it('Debería actualizar un Alumno', function(done) {
    var data = {
      "nombre": "Lucy",
      "email": "lucy@gmail.com",
      "telefono": 11111111
    };
    var update = {
      "nombre": "Daisy"
    };
    var id;
    async.waterfall([
      function createAlumno(callback) {
        request.post('/alumnos')
        .set('Accept', 'application/json')
        .send(data)
        .end(callback);
      },
      function updateAlumno(res, callback) {
        var alumno = res.body;
        id = alumno.id_alumno;
        request.put('/alumnos/' + id)
        .set('Accept', 'application/json')
        .send(update)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function getAlumno(res, callback) {
        request.get('/alumnos/' + id)
        .set('Accept', 'application/json')
        .send()
        .end(callback);
      },
      function assertions(res) {
        var alumno = res.body;
        expect(alumno).to.have.property('id_alumno', id);
        expect(alumno).to.have.property('nombre', "Daisy");
        expect(alumno).to.have.property('email', "lucy@gmail.com");
        expect(alumno).to.have.property('telefono', 11111111);
        done();
      }
    ], done);
  });
});

describe('DELETE /alumnos/:id', function() {
  it('Debería eliminar un Alumno', function(done) {
    var data = {
      "nombre": "Lucy",
      "email": "lucy@gmail.com",
      "telefono": 11111111
    };
    var id;
    async.waterfall([
      function createAlumno(callback) {
        request.post('/alumnos')
        .set('Accept', 'application/json')
        .send(data)
        .end(callback);
      },
      function deleteAlumno(res, callback) {
        var alumno = res.body;
        id = alumno.id_alumno;
        request.delete('/alumnos/' + id)
        .set('Accept', 'application/json')
        .send()
        .expect(204)
        .end(callback);
      },
      function getAlumno(res, callback) {
        request.get('/alumnos/' + id)
        .set('Accept', 'application/json')
        .send()
        .expect(404)
        .end(callback);
      }
    ], done);
  });
});
