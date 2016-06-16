## muReq - Multiple request [![Build Status](https://travis-ci.org/DarkScorpion/muReq.svg?branch=m)](https://travis-ci.org/DarkScorpion/muReq)

Module for multiple requests. It takes an array or object with the address of the request. Returns Promise with an array or object containing the result. Possible single request and customization of each individual request.  
**Warning**: Function return body of response, if not errors and status code 200. See [errors example](#errors).

### Examples
##### Single request
```js
var muReq = require('mureq');
var url = 'http://test.zz/';

muReq(url)
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
muReq( [url+'1', url+'2', url+'3'] )
  .then( (result) => {
    console.log(result) //=> [ 'get 1', 'get 2', 'get 3' ]
  })

//Multi request (object)
muReq( {a1: url+'1', a2: url+'2', a3: url+'3'} )
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
muReq(reqObj)
  .then( (result) => {
    console.log(result) //=> { a1: 'post 1', a2: 'get 2', a3: 'put 3' }
  })

//Specify the multi request method
muReq( [url+'1', url+'2', url+'3'], 'post' )
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
muReq(reqData, 'post')
  .then( (result) => {
    console.log(result) //=> [ 'put 1', 'post 2', 'delete 3', 'post 4' ]
  })
```

##### Errors
Function return body of response, if not errors and status code 200. If there is no error, but the status code is not equal to 200, it will be returned to null.
```js
var reqData = [
  url+'1',
  url+'/route404',
  'notUrl'
];
muReq(reqData)
  .then( (result) => {
    console.log(result) //=> [ 'get 1', null, Error('Invalid URI "notUrl"') ]
  })
```
