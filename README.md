## muReq - Multiple request [![Build Status](https://travis-ci.org/DarkScorpion/muReq.svg?branch=dev)](https://travis-ci.org/DarkScorpion/muReq)

Module for multiple requests. It takes an array or object with the address of the request. Returns Promise with an array or object containing the result. Possible single request and customization of each individual request.  
**Warning**: Function return body of response, if not errors and status code 200. See [errors example](#errors).

### Examples
```js
var muReqClass = require('mureq');
var muReq1 = new muReqClass(); //default settings
var muReq2 = new muReqClass({errCoef: 0.9}); //custom settings
```

##### Single request
```js
var url = 'http://test.zz/';

muReq.request(url)
  .then( (result) => {
    console.log(result) //=> 'ok'
  })
  .catch( (err) => {
    console.log(err)
  });
```

##### Multi request
```js
//Multi request (array)
muReq.request( [url+'1', url+'2', url+'3'] )
  .then( (result) => {
    console.log(result) //=> [ 'get 1', 'get 2', 'get 3' ]
  })

//Multi request (object)
muReq.request( {a1: url+'1', a2: url+'2', a3: url+'3'} )
  .then( (result) => {
    console.log(result) //=> { a1: 'get 1', a2: 'get 2', a3: 'get 3' }
  })
```

##### Customization requests
For custom request, use object with field of module [request](https://www.npmjs.com/package/request)
```js
//Custom metods
var reqObj = {
  a1: {url: url+'1', method: 'post'},
  a2: url+'2', //default method: GET
  a3: {url: url+'3', method: 'put'}
}
muReq.request(reqObj)
  .then( (result) => {
    console.log(result) //=> { a1: 'post 1', a2: 'get 2', a3: 'put 3' }
  })

//Specify the multi request method
muReq.request( [url+'1', url+'2', url+'3'], 'post' )
  .then( (result) => {
    console.log(result) //=> [ 'post 1', 'post 2', 'post 3' ]
  })

//Use mix of metods
var reqData = [
  {url: url+'1', method: 'put'},
  url+'2',
  {url: url+'3', method: 'delete'},
  url+'4',
]
muReq.request(reqData, 'post')
  .then( (result) => {
    console.log(result) //=> [ 'put 1', 'post 2', 'delete 3', 'post 4' ]
  })
```
##### Settings
You can customizate sittengs for you tasks.
```js
//Field of settings and their default value
{
  errCoef: 0.2, // if errors more 20%, promise return error;
  notCheckStatus: false // 404 and other status, considered an error
}
```

##### Errors
Function return body of response, if not errors and status code 200. If there is no error, but the status code is not equal to 200, it will be returned Error('Status code, is not 200'). Use settings field "notCheckStatus", if status code, not need check.
```js
var reqData = [
  url+'1',
  url+'/route404',
  'notUrl'
];
muReq.request(reqData)
  .then( (result) => {
    console.log(result) //=> [ 'get 1', Error('Status code, is not 200'), Error('Invalid URI "notUrl"') ]
  })
```
