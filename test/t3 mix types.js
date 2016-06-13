'use strict';
var assert  =require('assert');

var app = require('./server.js');
var muReq = require('../lib/multi-request.js');

var _port = 3003;
var _server = app.listen(_port);
var _baseUrl = 'http://localhost:'+_port;

describe('Mix type request', () => {
  it('Array /types PUT', (done) => {
    var typesUrl = _baseUrl+'/types';
    var input = [ typesUrl, typesUrl, typesUrl ];
    var output = [ 'put ok', 'put ok', 'put ok' ];
    testMuReq(input, output, done, 'put');
  })

  it('Object /types POST', (done) => {
    var typesUrl = _baseUrl+'/types';
    var input = {
      get1: {url: typesUrl, method: 'get'},
      post1: typesUrl,
      put: {url: typesUrl, method: 'put'},
      post2: typesUrl,
      get2: {url: typesUrl, method: 'get'},
      delete: {url: typesUrl, method: 'delete'}
    };
    var output = {
      get1: 'get ok',
      get2: 'get ok',
      post1: 'post ok',
      post2: 'post ok',
      put: 'put ok',
      delete: 'delete ok'
    };
    testMuReq(input, output, done, 'POST');
  });

  it('Single /types DELETE', (done) => {
    var input = _baseUrl+'/types';
    var output = 'delete ok';
    testMuReq(input, output, done, 'delete');
  });

});

function testMuReq(input, output, done, reqType) {
muReq(input, reqType)
  .then( (result) => {
    assert.deepEqual(output, result);
    done();
  })
  .catch( (err) => {
    assert.fail();
    done();
  });
}
