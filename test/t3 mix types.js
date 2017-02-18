'use strict';
var assert  =require('assert');

var app = require('./server.js');
var muReqClass = require('../index.js'); //test standart creating class
var muReq = new muReqClass();

const PORT = 3003;
const SERVER = app.listen(PORT);
const BASE_URL = 'http://localhost:'+PORT;

describe('Mix type request', () => {
  var typesUrl = BASE_URL+'/types';

  it('/types PUT (array)', (done) => {
    var input = [
      typesUrl, //default method
      {url: typesUrl, method: 'post'},
      {url: typesUrl, method: 'get'},
    ];
    var output = [ 'PUT ok', 'POST ok', 'GET ok' ];
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
      get1: 'GET ok',
      //get2: 'GET ok',
      post1: 'POST ok',
      post2: 'POST ok',
      put: 'PUT ok',
      delete: 'DELETE ok'
    };
    testMuReq(input, output, done, 'POST');
  });

  it('/types DELETE (single)', (done) => {
    var input = typesUrl;
    var output = 'DELETE ok';
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
