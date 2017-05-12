'use strict';
var request = require('supertest');
var async = require('async');
var api = require('../../../app.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Test INSCRIPCION', function() {

  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTQ1NTEwMzcxMzksImp0aSI6Im95emZxMmFycHciLCJleHAiOjE0OTQ2Mzc0MzcxMzksImRhdGEiOnsiaWRfdXN1YXJpbyI6MSwiaWRfcm9sIjoxfX0.qVBkuM6blzw3MHUPwVLgfolOQiX1VKba6U_vOu_hBkk';

  it('POST /api/inscripciones ............ Inscribir a un alumno en una materia', function(done) {
    var datos = {
      "fecha_inscripcion": "2015-03-05T00:00:00.000Z",
      "id_alumno": 1,
      "id_materia": 2
    };
    async.waterfall([
      function createInscripcion(callback) {
        request.post('/api/inscripciones')
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
        expect(data).to.have.property('id_inscripcion');
        expect(data).to.have.property('fecha_inscripcion', datos.fecha_inscripcion);
        expect(data).to.have.property('id_alumno', datos.id_alumno);
        expect(data).to.have.property('id_materia', datos.id_materia);
        done();
      }
    ], done);
  });

  it('DELETE /api/inscripciones/:id ...... Eliminar inscripcion', function(done) {
    async.waterfall([
      function deleteInscripcion(callback) {
        request.delete('/api/inscripciones/3')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200)
        .end(callback);
      },
      function getInscripcion(res, callback) {
        request.get('/api/inscripciones/3')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(404)
        .end(callback);
      }
    ], done);
  });

});
