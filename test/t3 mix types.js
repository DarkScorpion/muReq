'use strict';
var assert  =require('assert');

var app = require('./server.js');
var muReqClass = require('../lib/multi-request.js');
var muReq = new muReqClass();

const PORT = 3003;
const SERVER = app.listen(PORT);
const BASE_URL = 'http://localhost:'+PORT;

describe('Mix type request', () => {
  var typesUrl = BASE_URL+'/types';

  it('/types PUT (array)', (done) => {
    var input = [ typesUrl, typesUrl, typesUrl ];
    var output = [ 'put ok', 'put ok', 'put ok' ];
    testMuReq(input, output, done, 'put');
  })

  it('/types POST (object)', (done) => {
    var input = {
      get1: {url: typesUrl, method: 'get'},
      post1: typesUrl,
      put: {url: typesUrl, method: 'put'},
      post2: typesUrl,
      //get2: {url: typesUrl, method: 'get'},
      delete: {url: typesUrl, method: 'delete'}
    };
    var output = {
      get1: 'get ok',
      //get2: 'get ok',
      post1: 'post ok',
      post2: 'post ok',
      put: 'put ok',
      delete: 'delete ok'
    };
    testMuReq(input, output, done, 'POST');
  });

  it('/types DELETE (single)', (done) => {
    var input = typesUrl;
    var output = 'delete ok';
    testMuReq(input, output, done, 'delete');
  });

});

function testMuReq(input, output, done, reqType) {
  muReq.request(input, reqType)
    .then( (result) => {
      assert.deepEqual(output, result);
      done();
    })
    .catch( (err) => {
      assert.fail();
      done();
    });
}
