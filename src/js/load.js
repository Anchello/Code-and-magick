'use strict';

function load(url, params, callback) {
  var xhr = new XMLHttpRequest();

  function getSearchString(params) {
    return Object.keys(params).map(function(param) {
      return [param, params[param]].join('=');
    }).join('&');
  }

  /** @param {ProgressEvent} evt */
  xhr.onload = function(evt) {
    try {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    } catch(err) {
      console.log(err);
    }
    console.log(loadedData);
  };

  xhr.open('GET', url + '?' + getSearchString(params));

  xhr.send();

  console.log(params);
}

module.exports = load;
