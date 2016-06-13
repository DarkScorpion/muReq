'use strict';
//Copyright (c) 2016 Александр Смит (https://github.com/DarkScorpion)
function typeOf(input) {

  var inputType = typeof input;

  if (inputType === 'object') {
    if (input == null) return null;
    if ( Array.isArray(input) ) return 'array';
    if (input instanceof Date) return 'date';
    if (input instanceof RegExp) return 'regexp';
    if (input instanceof Error) return 'error';

    return 'object';
  }

  return inputType;
}

module.exports = typeOf;
