'use strict';
var assert = require('assert');

var muReqClass = require('../index.js');

const ERROR = require('./errors.js');

describe('Static metods', () => {
  describe('Prepare data', () => {
    it('Prepare urls (array)', (done) => {
      var urls = ['aaa', 'bbb', 'ccc'];
      var options = {headers: 'test'};

      var input = muReqClass.prepareData(urls, options);

      var output = [
        { url:'aaa', headers: 'test' },
        { url:'bbb', headers: 'test' },
        { url:'ccc', headers: 'test' }
      ];

      assert.deepEqual(input, output);
      done();
    });

    it('Prepare urls (object)', (done) => {
      var urls = {
        a1: 'aaa',
        b1: 'bbb',
        c1: 'ccc'
      };
      var options = {headers: 'test'};

      var input = muReqClass.prepareData(urls, options);

      var output = {
        a1: { url:'aaa', headers: 'test' },
        b1: { url:'bbb', headers: 'test' },
        c1: { url:'ccc', headers: 'test' }
      };

      assert.deepEqual(input, output);
      done();
    });

    it('reqData is not Array or Object', (done) => {
      assert.deepEqual( muReqClass.prepareData(11, {}), ERROR.mustArrObj );
      assert.deepEqual( muReqClass.prepareData('zax', {}), ERROR.mustArrObj );
      //err.mustArrObj will be first
      assert.deepEqual( muReqClass.prepareData(11, 'aaa'), ERROR.mustArrObj );
      done();
    });

    it('reqOptions is not Object', (done) => {
      assert.deepEqual( muReqClass.prepareData([ 'aaa' ], 'bbb'), ERROR.mustObj );
      assert.deepEqual( muReqClass.prepareData({ a1: 'aaa' }, []), ERROR.mustObj );

      assert.deepEqual( muReqClass.prepareData( [ 'aaa' ], 123 ), ERROR.mustObj );
      assert.deepEqual( muReqClass.prepareData( { a1: 'aaa' }, /reg/i ), ERROR.mustObj );
      done();
    });

  });
});

