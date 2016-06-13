'use strict';
//Copyright (c) 2016 Александр Смит (https://github.com/DarkScorpion)
var request = require('request');
var typeOf = require('./typeOf.js');

/**
* Make multiple request.
* @param {string|array|object} reqData - Data with url's for requests.
* @return {Promise} Promise with array or object data in response.
*/
module.exports = function (reqData, reqType) {
  var rdType = typeOf(reqData);
  if (rdType === 'string') {
    return singleRequest(reqData, reqType);
  }
  if (rdType === 'array' || rdType === 'object') {
    return multiRequest(reqData, reqType);
  }

  throw new Error('reqData param must be string or array or object!');
}

function multiRequest(reqData, reqType) {
  return new Promise( (resolve, reject) => {
    var counter = 0;
    var rdType = typeOf(reqData);
    var reqMethod = reqType || 'GET';
    var length = rdType === 'array' ? reqData.length : Object.keys(reqData).length;
    var result = rdType === 'array' ? new Array(length) : {};

    for(let key in reqData) {
      var value = reqData[key];
      var options = typeOf(value) === 'object' ? value : {url: value, method: reqMethod};
      request(options, (err, res, body) => {
        if (!err && res.statusCode === 200) {
          result[key] = body;
          counter++;
        } else {
          result[key] = err;
          counter++;
        }

        if (counter === length) {
          resolve(result);
        }
      });
    }

  });
}

function singleRequest(reqUrl, reqType) {
  return new Promise((resolve, reject) => {
    var options = {
      url: reqUrl,
      method: reqType || 'GET'
    };

    request(options, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        resolve(body);
      } else {
        reject(err);
      }
    });

  });
}
