'use strict';
var assert  =require('assert');

var app = require('./server.js');
var muReq = require('../lib/multi-request.js');

const PORT = 3003;
const SERVER = app.listen(PORT);
const BASE_URL = 'http://localhost:'+PORT;

describe('Mix type request', () => {
  it('/types PUT (array)', (done) => {
    var typesUrl = BASE_URL+'/types';
    var input = [ typesUrl, typesUrl, typesUrl ];
    var output = [ 'put ok', 'put ok', 'put ok' ];
    testMuReq(input, output, done, 'put');
  })

  it('/types POST (object)', (done) => {
    var typesUrl = BASE_URL+'/types';
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

  it('/types DELETE (single)', (done) => {
    var input = BASE_URL+'/types';
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
