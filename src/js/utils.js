'use strict';

var lastCall = Date.now();

var utils = {
  throttle: function(fn, wait) {
    if (Date.now() - lastCall >= wait) {
      fn();
    }
    lastCall = Date.now();
  }
};

module.exports = utils;
