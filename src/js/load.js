'use strict';

function load(url, params, callback) {
  var xhr = new XMLHttpRequest();

  /** @param {ProgressEvent} evt */
  xhr.onload = function(evt) {
    try {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    } catch(err) {
      console.log(err);
    }
  };

  xhr.open('GET', url + '?from=' + params.from + '&to=' + params.to + '&filter=' + params.filter);

  xhr.send();
}

module.exports = load;
