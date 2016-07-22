'use strict';
var assert  =require('assert');
var request = require('request');

var app = require('./server.js');

const PORT = 3001;
const SERVER = app.listen(PORT);
const BASE_URL = 'http://localhost:'+PORT;

describe('Check server', () => {
  it('/index GET', (done) => {
    testRequest('/', 'get', (err, res, body) => {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 'ok');
      done();
    });
  });

  it('/types GET', (done) => {
    testRequest('/types', 'get', (err, res, body) => {
      assert.equal(body, 'GET ok');
      done();
    });
  });

  it('/types POST', (done) => {
    testRequest('/types', 'post', (err, res, body) => {
      assert.equal(body, 'POST ok');
      done();
    });
  });

  it('/types PUT', (done) => {
    testRequest('/types', 'put', (err, res, body) => {
      assert.equal(body, 'PUT ok');
      done();
    });
  });

  it('/types DEL', (done) => {
    testRequest('/types', 'delete', (err, res, body) => {
      assert.equal(body, 'DELETE ok');
      done();
    });
  });

  it('/echo GET', (done) => {
    var echoData = '123'
    testRequest('/echo/'+echoData, 'get', (err, res, body) => {
      assert.equal(body, echoData);
      done();
    });
  });

  it('/query GET', (done) => {
    var query = '?p1=aaa&p2=bbb';
    testRequest('/query'+query, 'get', (err, res, body) => {
      assert.equal(body, 'aaa bbb');
      done();
    });
  });

  it('/route404 GET', (done) => {
    testRequest('/route404', 'get', (err, res, body) => {
      assert.equal(err, null);
      assert.equal(res.statusCode , 404);
      assert.equal(body, '404');
      done();
    });
  });

  after( () => {
    SERVER.close();
  });

});

function testRequest(route, method, cb) {
  request({
    url: BASE_URL+route,
    method: method,
  }, (err, res, body) => {
    cb(err, res, body);
  });
}
