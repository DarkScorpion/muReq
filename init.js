
module.exports = function(arg) {
  var muReqClass = require('./lib/multi-request.js');
  return new muReqClass(arg);
}
