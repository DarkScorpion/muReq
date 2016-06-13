'use strict';
var assert  =require('assert');
var request = require('request');

var app = require('./server.js');

var _port = 3001;
var _server = app.listen(_port);
var _baseUrl = 'http://localhost:'+_port;

describe('Check server', () => {
  it('/ GET', (done) => {
    testRequest('/', 'get', (err, res, body) => {
      assert.equal(err, null);
      assert.equal(res.statusCode , 200);
      assert.equal(body, 'ok');
      done();
    });
  });

  it('/types GET', (done) => {
    testRequest('/types', 'get', (err, res, body) => {
      assert.equal(body, 'get ok');
      done();
    });
  });

  it('/types POST', (done) => {
    testRequest('/types', 'post', (err, res, body) => {
      assert.equal(body, 'post ok');
      done();
    });
  });

  it('/types PUT', (done) => {
    testRequest('/types', 'put', (err, res, body) => {
      assert.equal(body, 'put ok');
      done();
    });
  });

  it('/types DEL', (done) => {
    testRequest('/types', 'delete', (err, res, body) => {
      assert.equal(body, 'delete ok');
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

  after( () => {
    _server.close();
  });

});

function testRequest(route, method, cb) {
  request({
    url: _baseUrl+route,
    method: method,
  }, (err, res, body) => {
    cb(err, res, body);
  });
}
