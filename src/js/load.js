'use strict';

var callbackCounter = 0;

function load(url, callback) {
  var JSONPCallback = 'cb' + callbackCounter;
  callbackCounter++;

  window[JSONPCallback] = function(data) {
    callback(data);
  };

  var script = document.createElement('script');
  script.src = url + '?callback=' + JSONPCallback;
  document.body.appendChild(script);
}

module.exports = load;
