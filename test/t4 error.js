'use strict';
var assert = require('assert');

var app = require('./server.js');
var muReqClass = require('../lib/multi-request.js');
var muReq = new muReqClass({errCoef: 0.8}); //need many erros =)

const PORT = 3004;
const SERVER = app.listen(PORT);
const BASE_URL = 'http://localhost:'+PORT;

const ERRORS = {
  notUrl: new Error('Invalid URI "notUrl"'),
  manyErr: new Error('Many error returns'),
  not200: new Error('Status code, is not 200')
};

describe('Error in requests', () => {
  describe('Multiple', () => {
    it('Array', (done) => {
      var input = [
        BASE_URL+'/',
        BASE_URL+'/types',
        BASE_URL+'/route404',
        'notUrl'
      ];
      var output = [
        'ok',
        'GET ok',
        ERRORS.not200,
        ERRORS.notUrl
      ];

      testMuReq(input, output, done);
    });

    it('Object', (done) => {
      var input = {
        a: BASE_URL+'/',
        b: BASE_URL+'/types',
        c: BASE_URL+'/route404',
        d: 'notUrl'
      };
      var output = {
        a: 'ok',
        b: 'GET ok',
        c: ERRORS.not200,
        d: ERRORS.notUrl
      };

      testMuReq(input, output, done);
    });
  });

  describe('Single', () => {
    it('Standart', (done) => {
      testErr('notUrl', ERRORS.notUrl, done);
    });
  });

  after( () => {
    SERVER.close();
  });

});

function testMuReq(input, output, done) {
  muReq.request(input)
    .then( (result) => {
      assert.deepEqual(output, result);
      done();
    })
    .catch( (err) => {
      assert.fail();
      done();
    });
}

function testErr(input, output, done) {
  muReq.request(input)
    .then( (result) => {
      assert.fail();
      done();
    })
    .catch( (err) => {
      assert.deepEqual(output, err);
      done();
    });
}

