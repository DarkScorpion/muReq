'use strict';
var assert = require('assert');

var app = require('./server.js');
var muReqClass = require('../lib/multi-request.js');

const PORT = 3005;
const SERVER = app.listen(PORT);
const BASE_URL = 'http://localhost:'+PORT;

const ERRORS = {
  notUrl: new Error('Invalid URI "notUrl"'),
  manyErr: new Error('Many error returns'),
  not200: new Error('Status code, is not 200')
};

describe('Settings', () => {
  describe('Create/Set/Get', () => {
    it('Create default', () => {
      var muReq = new muReqClass();
      var def = {
        errCoef: 0.2,
        notCheckStatus: false
      }
      assert.deepEqual(muReq.getSettings(), def);
    });

    it('Create custom', () => {
      var s1 = {
        errCoef: 0.9,
        notCheckStatus: false
      }

      var muReq = new muReqClass(s1);
      assert.deepEqual(muReq.getSettings(), s1);
    });

    it('Set/Get (Lined)', () => {
      var muReq = new muReqClass();
      
      var s1 = {
        errCoef: 0.2
      };
      muReq.setSettings(s1);
      assert.equal(muReq.getSettings().errCoef, 0.2);

      var s2 = {
        errCoef: 0.8
      };
      muReq.setSettings(s2);
      assert.equal(muReq.getSettings().errCoef, 0.8);

       var s3 = {
        notCheckStatus: true
      };
      muReq.setSettings(s3);
      assert.equal(muReq.getSettings().notCheckStatus, true);

      var final = {
        errCoef: 0.8,
        notCheckStatus: true
      }

      assert.deepEqual(muReq.getSettings(), final);
    });
  });

  describe('Error corficient option', () => {
    var baseInput = [
      BASE_URL+'/',
      BASE_URL+'/',
      BASE_URL+'/route404',
      'notUrl',
      'notUrl'
    ];

    it('Errors catch', (done) => {
      testErr(baseInput, ERRORS.manyErr, done, {errCoef: 0.2});
    });

    it('Errors pass', (done) => {
      var output = [
        'ok', 'ok',
        ERRORS.not200,
        ERRORS.notUrl, ERRORS.notUrl
      ];

      testMuReq(baseInput, output, done, {errCoef: 0.8});
    });
  });

  describe('Not check status option', () => {
    var baseInput = [
      BASE_URL+'/',
      BASE_URL+'/route404',
      BASE_URL+'/route404',
      'notUrl'
    ];

    it('Check status', (done) => {
      var output = [
        'ok',
        ERRORS.not200,
        ERRORS.not200,
        ERRORS.notUrl
      ];
      testMuReq(baseInput, output, done, {errCoef: 0.8, notCheckStatus: false});
    });

    it('Not check status', (done) => {
      var output = [
        'ok',
        '404',
        '404',
        ERRORS.notUrl
      ];

      testMuReq(baseInput, output, done, {errCoef: 0.8, notCheckStatus: true});
    });
  });

});

function testMuReq(input, output, done, settings) {
  var muReq = new muReqClass(settings);
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

function testErr(input, output, done, settings) {
  var muReq = new muReqClass(settings);
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
