'use strict';
var assert = require('assert');

var app = require('./server.js');
var muReq = require('../lib/multi-request.js');

const PORT = 3004;
const SERVER = app.listen(PORT);
const BASE_URL = 'http://localhost:'+PORT;

const ERRORS = {
  notUrl: new Error('Invalid URI "notUrl"')
}

describe('Error in requests', () => {
  it('Array', (done) => {
    var input = [
      BASE_URL+'/',
      BASE_URL+'/route404',
      'notUrl'
    ];
    var output = [ 'ok', null, ERRORS.notUrl ];

    testMuReq(input, output, done);
  });

  it('Object', (done) => {
    var input = {
      a: BASE_URL+'/',
      b: BASE_URL+'/route404',
      c: BASE_URL+'/types',
      d: 'notUrl'
    };
    var output = {
      a: 'ok',
      b: null,
      c: 'get ok',
      d: ERRORS.notUrl
    };

    testMuReq(input, output, done);
  });
  

  after( () => {
    SERVER.close();
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
