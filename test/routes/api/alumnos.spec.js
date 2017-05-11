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

  it('POST /api/alumnos', function(done) {
    async.waterfall([
      function createAlumno(callback) {
        request.post('/api/alumnos')
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
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

  it('DELETE /api/alumnos/:id', function(done) {
    async.waterfall([
      function deleteAlumno(callback) {
        request.delete('/api/alumnos/' + id_alumno)
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
        .expect(204)
        .end(callback);
      },
      function getAlumno(res, callback) {
        request.get('/api/alumnos/' + id_alumno)
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
        .expect(404)
        .end(callback);
      }
    ], done);
  });

  it('GET /api/alumnos', function(done) {
    async.waterfall([
      function createAlumno(callback) {
        request.post('/api/alumnos')
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
        .send(alumno)
        .end(callback);
      },
      function getAlumno(res, callback) {
        id_alumno = res.body.id_alumno;
        request.get('/api/alumnos')
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
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

  it('GET /api/alumnos/:id', function(done) {
    async.waterfall([
      function getAlumno(callback) {
        request.get('/api/alumnos/' + id_alumno)
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
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

  it('PUT /api/alumnos/:id', function(done) {
    var alumnoUpdated = {
      "nombre": "Daisy"
    };
    async.waterfall([
      function updateAlumno(callback) {
        request.put('/api/alumnos/' + id_alumno)
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
        .send(alumnoUpdated)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(callback);
      },
      function getAlumno(res, callback) {
        request.get('/api/alumnos/' + id_alumno)
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
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
        request.delete('/api/alumnos/' + id_alumno).end(callback);
      }
    ], done);
  });

});
