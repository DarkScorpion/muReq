'use strict';
var assert = require('assert');

var app = require('./server.js');
var muReq = require('../lib/multi-request.js');

const PORT = 3002;
const SERVER = app.listen(PORT);
const BASE_URL = 'http://localhost:'+PORT;

describe('Myltiple request', () => {
  describe('Single request', () => {
    it('Single', (done) => {
      var url = BASE_URL+'/';
      testMuReq(url, 'ok', done);
    })
  });

  describe('Types test', () => {
    it('Array', (done) => {
      var typesUrl = BASE_URL+'/types';
      var input = [
        {url: typesUrl, method: 'get'},
        {url: typesUrl, method: 'post'},
        {url: typesUrl, method: 'put'},
        {url: typesUrl, method: 'delete'}
      ];
      var output = ['get ok', 'post ok', 'put ok', 'delete ok'];
      testMuReq(input, output, done);
    })

    it('Object', (done) => {
      var typesUrl = BASE_URL+'/types';
      var input = {
        get: {url: typesUrl, method: 'get'},
        post: {url: typesUrl, method: 'post'},
        put: {url: typesUrl, method: 'put'},
        delete: {url: typesUrl, method: 'delete'}
      };
      var output = {
        get: 'get ok',
        post: 'post ok',
        put: 'put ok',
        delete: 'delete ok'
      };
      
      testMuReq(input, output, done);
    })
  });

  describe('Echo test', () => {
    it('Array', (done) => {
      var echoArr = ['aaa', 'bbb'];
      
      var input = [];
      for(var i=0; i<echoArr.length; i++) {
        input.push(BASE_URL+'/echo/'+echoArr[i]);
      }
      
      testMuReq(input, echoArr, done);
    });

    it('Object', (done) => {
      var echoObj = {
        a1: 'aaa',
        a2: 'bbb',
        a3: 'ccc'
      };
      
      var input = {};
      for(var key in echoObj) {
        input[key] = BASE_URL+'/echo/'+echoObj[key];
      }

      testMuReq(input, echoObj, done);
    });
  });

  describe('Query test', () => {
    it('Array', (done) => {
      var queryArr = ['?p1=ccc', '?p2=zzz', '?p1=aaa&p2=bbb'];

      var input = [];
      for(var i=0; i<queryArr.length; i++) {
        input.push(BASE_URL+'/query'+queryArr[i]);
      }
      var output = ['ccc ???', '??? zzz', 'aaa bbb'];

      testMuReq(input, output, done);
    });

    it('Object', (done) => {
      var queryObj = {
        a1: '?p1=ccc',
        a2: '?p2=zzz',
        a3: '?p1=aaa&p2=bbb'
      };

      var input = {};
      for(var key in queryObj) {
        input[key] = BASE_URL+'/query'+queryObj[key];
      }
      var output = {
        a1: 'ccc ???',
        a2: '??? zzz',
        a3: 'aaa bbb'
      };

      testMuReq(input, output, done);
    });

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
