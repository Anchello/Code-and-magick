'use strict';

function load(url, params, callback) {
  var xhr = new XMLHttpRequest();

  /** @param {ProgressEvent} evt */
  xhr.addEventListener('load', function(evt) {
    try {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    } catch(err) {
      console.log(err);
    }
    console.log(loadedData);
  });
  // xhr.open('GET', url);

  xhr.open('GET', url + '?' + getSearchString(params));
  xhr.send();

  function getSearchString(params) {
    return Object.keys(params).map(function(param) {
      return [param, params[param]].join('=');
    }).join('&');
  }
}

module.exports = load;
