'use strict';
//Copyright (c) 2016 Александр Смит (https://github.com/DarkScorpion)
var request = require('request');
var typeOf = require('./typeOf.js');

const DEF_SETTINGS = {
  errCoef: 0.2,
  checkStatusCode: true
}

const ERROR = {
  manyErr: new Error('Many error returns'),
  not200: new Error('Status code, is not 200'),
  mustObj: new Error('reqData param must be object!'),
  mustArrObj: new Error('reqData param must be array or object!'),
  mustStrArrObj: new Error('reqData param must be string or array or object!')
};

class muReq {
  constructor(opt) {
    this._settings = Object.assign({}, DEF_SETTINGS, opt);
  }

  setSettings(opt) {
    this._settings = Object.assign({}, this._settings, opt);
  }

  getSettings() {
    return Object.assign({}, this._settings);
  }

  get(reqData) {
    return this.request(reqData, 'get');
  }

  post(reqData) {
    return this.request(reqData, 'post');
  }

  put(reqData) {
    return this.request(reqData, 'put');
  }

  delete(reqData) {
    return this.request(reqData, 'delete');
  }

  request(reqData, reqType) {
    var rdType = typeOf(reqData);
    if (rdType === 'string') {
      return this._singleRequest(reqData, reqType);
    }
    if (rdType === 'array' || rdType === 'object') {
      return this._multiRequest(reqData, reqType);
    }

    throw ERROR.mustStrArrObj;
  }

  static prepareData(reqData, reqOptions) {
    var rdType = typeOf(reqData);

    if(rdType !== 'array' && rdType !== 'object') {
      return ERROR.mustArrObj;
    }
    if( typeOf(reqOptions) !== 'object' ) {
      return ERROR.mustObj;
    }

    var result = (rdType === 'array') ? new Array(reqData.length) : {};

    for(let key in reqData) {
      var value = reqData[key];
      var pushData = ( typeOf(value) === 'object' ) ? value : {url: value};

      result[key] = Object.assign({}, reqOptions, pushData);
    }

    return result;
  }

  _multiRequest(reqData, reqType) {
    return new Promise( (resolve, reject) => {
      var counter = 0;
      var errCounter = 0;

      var rdType = typeOf(reqData);
      var reqMethod = reqType || 'GET';
      var notCheck = !this._settings.checkStatusCode;

      var length = rdType === 'array' ? reqData.length : Object.keys(reqData).length;
      var result = rdType === 'array' ? new Array(length) : {};

      for(let key in reqData) {
        var value = reqData[key];
        var options = ( typeOf(value) === 'object' ) ? value : {url: value, method: reqMethod};
        request(options, (err, res, body) => {
          if ( !err && (notCheck || res.statusCode === 200) ) {
            result[key] = body;
            counter++;
          } else {
            result[key] = err || ERROR.not200;
            errCounter++;
            counter++;
          }

          if (counter === length) {
            var isManyErr = errCounter/length > this._settings.errCoef;
            if (isManyErr) {
              reject(ERROR.manyErr);
            } else {
              resolve(result);
            }
          }

        });
      }

    });
  }

  _singleRequest(reqUrl, reqType) {
    return new Promise((resolve, reject) => {
      var options = {
        url: reqUrl,
        method: reqType || 'GET'
      };
      var notCheck = !this._settings.checkStatusCode;

      request(options, (err, res, body) => {
        if ( !err && (notCheck || res.statusCode === 200) ) {
          resolve(body);
        } else {
          reject(err || ERROR.not200);
        }
      });

    });
  }
}

module.exports = muReq; 

