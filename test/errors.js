
module.exports = {
  manyErr: new Error('Many error returns'),
  notUrl: new Error('Invalid URI "notUrl"'),
  not200: new Error('Status code, is not 200'),
  mustObj: new Error('reqData param must be object!'),
  mustArrObj: new Error('reqData param must be array or object!'),
  mustStrArrObj: new Error('reqData param must be string or array or object!')
};
