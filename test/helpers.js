var supertest = require("supertest");
var chai = require("chai");
var app = require('../app.js');

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
