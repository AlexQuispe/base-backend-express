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

  it('POST /api/inscripciones', function(done) {
    async.waterfall([
      function createAlumno(callback) {
        request.post('/api/alumnos')
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
        .send(alumno)
        .end(callback);
      },
      function createMateria(res, callback) {
        request.post('/api/materias')
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
        .send(materia)
        .end(callback);
      },
      function createInscripcion(res, callback) {
        request.post('/api/inscripciones')
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
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

  it('DELETE /api/inscripciones/:id', function(done) {
    async.waterfall([
      function deleteInscripcion(callback) {
        request.delete('/api/inscripciones/' + id_inscripcion)
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
        .expect(204)
        .end(callback);
      },
      function getInscripcion(res, callback) {
        request.get('/api/inscripciones/' + id_inscripcion)
        .set('Accept', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ0NzQ1NjMzNjIsImp0aSI6Im42NDBjNG9ndjYiLCJleHAiOjE0OTQ1NjA5NjMzNjIsImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwidXN1YXJpbyI6ImFkbWluIiwiY29udHJhc2VuYSI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sIjoiQURNSU4iLCJfZmVjaGFfY3JlYWNpb24iOiIyMDE3LTA1LTExVDAwOjU3OjQxLjAwMFoiLCJfZmVjaGFfbW9kaWZpY2FjaW9uIjoiMjAxNy0wNS0xMVQwMDo1Nzo0MS4wMDBaIn19.wRAvriwO3SFdu1j7b33yv-ZxWB0_Yo4b_Av6kHLz3C0')
        .expect(404)
        .end(callback);
      }
    ], done);
  });

  after(function(done) {
    async.waterfall([
      function deleteAlumno(callback) {
        request.delete('/api/alumnos/' + id_alumno).end(callback);
      },
      function deleteMateria(res, callback) {
        request.delete('/api/materias/' + id_materia).end(callback);
      }
    ], done);
  });

});
