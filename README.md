## muReq - Multiple Request [![Build Status](https://travis-ci.org/DarkScorpion/muReq.svg?branch=m)](https://travis-ci.org/DarkScorpion/muReq)

Module for multiple requests. It takes an array or object with the address of the request. Returns Promise with an array or object containing the result. Possible single request and customization of each individual request.  

### Install
```
npm install mureq
```

### Examples
#### Start
```js
var muReqClass = require('mureq');
var muReq = new muReqClass(); //default settings
var muReqCustom = new muReqClass({errCoef: 0.9}); //custom settings
```

#### Single request
```js
var url = 'http://test.zz/';

muReq.get(url)
  .then( (result) => {
    console.log(result) //=> 'ok'
  })
  .catch( (err) => {
    console.log(err)
  });
```

#### Multi request
```js
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
##### Specify the multi request method
```js
muReq.post( [url+'1', url+'2', url+'3'] )
  .then( (result) => {
    console.log(result) //=> [ 'post 1', 'post 2', 'post 3' ]
  })
```
##### Cloning configuration request fields
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
  checkStatusCode: true // 404 and other status, considered an error
}
```

#### Errors
Function return body of response, if not errors and status code 200. If there is no error, but the status code is not equal to 200, it will be returned Error('Status code, is not 200'). 
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
If you need all the status codes
```js
muReq.setSettings({checkStatusCode: false});
muReq.get(reqData)
  .then( (result) => {
    console.log(result) //=> [ 'get 1', 'route 404 data', Error('Invalid URI "notUrl"') ]
  })

```
