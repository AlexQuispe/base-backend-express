'use strict';
var supertest = require("supertest");
var chai = require("chai");

process.env.NODE_ENV = 'test'
var app = require('../app.js');

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
