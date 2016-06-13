'use strict';
var assert  =require('assert');

var app = require('./server.js');
var muReq = require('../lib/multi-request.js');

var _port = 3002;
var _server = app.listen(_port);
var _baseUrl = 'http://localhost:'+_port;

describe('Myltiple request', () => {
  describe('Single request', () => {
    it('Single', (done) => {
      var url = _baseUrl+'/';
      testMuReq(url, 'ok', done);
    })
  });

  describe('Types test', () => {
    it('Array', (done) => {
      var typesUrl = _baseUrl+'/types';
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
      var typesUrl = _baseUrl+'/types';
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
        input.push(_baseUrl+'/echo/'+echoArr[i]);
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
        input[key] = _baseUrl+'/echo/'+echoObj[key];
      }

      testMuReq(input, echoObj, done);
    });
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
