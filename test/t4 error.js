'use strict';
var assert = require('assert');

var app = require('./server.js');
var muReq = require('../lib/multi-request.js');

var _port = 3004;
var _server = app.listen(_port);
var _baseUrl = 'http://localhost:'+_port;

var _errTypes = {
  notUrl: new Error('Invalid URI "notUrl"')
}

describe('Error in requests', () => {
  it('Array', (done) => {
    var input = [
      _baseUrl+'/',
      _baseUrl+'/emptyRoute',
      'notUrl'
    ];
    var output = [ 'ok', null, _errTypes.notUrl ];

    testMuReq(input, output, done);
  });

  it('Object', (done) => {
    var input = {
      a: _baseUrl+'/',
      b: _baseUrl+'/emptyRoute',
      c: _baseUrl+'/types',
      d: 'notUrl'
    };
    var output = {
      a: 'ok',
      b: null,
      c: 'get ok',
      d: _errTypes.notUrl
    };

    testMuReq(input, output, done);
  });
  

  after( () => {
    _server.close();
  });

});

function testMuReq(input, output, done) {
  muReq(input)
    .then( (result) => {
      assert.deepEqual(output, result);
      done();
    })
    .catch( (err) => {
      assert.fail();
      done();
    });
}
