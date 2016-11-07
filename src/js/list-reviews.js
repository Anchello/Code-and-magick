'use strict';

function init() {
  var load = require('./load');
  var Review = require('./review');
  var container = document.querySelector('.reviews-list');
  var filter = document.querySelector('.reviews-filter');
  var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  function hideFilter() {
    filter.classList.add('invisible');
  }
  function showFilter() {
    filter.classList.remove('invisible');
  }
  function renderReviews(reviews) {
    reviews.forEach(function(item) {
      var reviewItem = new Review(item);
      container.appendChild(reviewItem.element);
    });
  }

  hideFilter();

  load(REVIEWS_LOAD_URL, renderReviews);

  showFilter();
}

module.exports.init = init;
