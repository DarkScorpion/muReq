## muReq - Multiple Request  
[![Build Status](https://travis-ci.org/DarkScorpion/muReq.svg?branch=m)](https://travis-ci.org/DarkScorpion/muReq)
[![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg)](https://travis-ci.org/DarkScorpion/muReq)
[![Downloads](https://img.shields.io/npm/dt/mureq.svg)](https://travis-ci.org/DarkScorpion/muReq)
[![Downloads in Month](https://img.shields.io/npm/dm/mureq.svg)](https://travis-ci.org/DarkScorpion/muReq)


Node.js module, for multiple and single requests with using Promises. It takes an array or object with the addreses of the request. Returns Promise with an array or object containing the result. Flexible customization down to the individual fields of the request.  

### Install
```
npm install mureq
```

### Examples
#### Start
```js
var muReqClass = require('mureq');
var muReq = new muReqClass(); //default settings
var muReqCustom = new muReqClass( {errCoef: 0.9} ); //custom settings
```
or use one-line init script (can use settings object)
```js
var muReq = require('mureq/init')();
```

#### Multi request
```js
var url = 'http://test.zz/';

//Multi request (array)
muReq.get( [url+'1', url+'2', url+'3'] )
  .then( (result) => {
    console.log(result) //=> [ 'get 1', 'get 2', 'get 3' ]
  })

//Multi request (object)
muReq.get( {a1: url+'1', a2: url+'2', a3: url+'3'} )
  .then( (result) => {
    console.log(result) //=> { a1: 'get 1', a2: 'get 2', a3: 'get 3' }
  })
```

#### Single request
```js
muReq.get('http://test.zz/')
  .then( (result) => {
    console.log(result) //=> 'ok'
  })
  .catch( (err) => {
    console.log(err)
  });
```

#### Specify the multi request method (get, post, put, delete)
```js
var urls = [url+'1', url+'2', url+'3'];

muReq.post(urls)
  .then( (result) => {
    console.log(result) //=> [ 'post 1', 'post 2', 'post 3' ]
  })

muReq.put(urls)
  .then( (result) => {
    console.log(result) //=> [ 'put 1', 'put 2', 'put 3' ]
  })
```

#### Customization requests
For custom request, use object with field of module [request](https://www.npmjs.com/package/request)
```js
//Custom metods
var reqObj = {
  a1: {url: url+'1', method: 'post'},
  a2: url+'2',
  a3: {url: url+'3', method: 'put'}
}
muReq.get(reqObj)
  .then( (result) => {
    console.log(result) //=> { a1: 'post 1', a2: 'get 2', a3: 'put 3' }
  })
```

#### Cloning configuration request fields
If you want to make requests with certain fields at different urls, use the static method prepareData
```js
var url = 'http://test.zz/';
var urls = [url+1, url+2, url+3];
var options = {
  method: 'POST',
  headers: {
    'User-Agent': 'request'
  }
};

var result = muReq.prepareData(urls, options);

console.log(result) 
/* => [
  { url: 'http://test.zz/1', { method: 'POST', headers: { 'User-Agent': 'request' } } },
  { url: 'http://test.zz/2', { method: 'POST', headers: { 'User-Agent': 'request' } } },
  { url: 'http://test.zz/3', { method: 'POST', headers: { 'User-Agent': 'request' } } }
]
*/
```

#### Settings
You can customizate sittengs for you tasks.
```js
{ //Field of settings and their default value
  errCoef: 0.2, // if errors more 20%, promise return error;
  checkStatusCode: true, // 404 and other status, considered an error
  promise: Promise // native Node.js promise
}
//Customizate example and check settings
muReq.setSettings( {errCoef: 0.8} );
console.log( muReq.getSettings() ); //=> { errCoef: 0.8, checkStatusCode: true }
```

#### Use other promise library
You can specify a different Promis library. Bluebird package (v 3.4.7) tested and works.
```js
var muReq = new muReqClass( { promise: require('bluebird') } );
```
or
```js
muReq.setSettings( { promise: require('bluebird') } );
```

#### Errors
Function return body of response, if not errors and status code 200. 
```js
var reqData = [
  url+'1',
  url+'/route404',
  'notUrl'
];
muReq.get(reqData)
  .then( (result) => {
    console.log(result) //=> [ 'get 1', Error('Status code, is not 200'), Error('Invalid URI "notUrl"') ]
  })
```
If not need check status code, change settings.
```js
muReq.setSettings( {checkStatusCode: false} );
muReq.get(reqData)
  .then( (result) => {
    console.log(result) //=> [ 'get 1', 'route 404 data', Error('Invalid URI "notUrl"') ]
  })

```
