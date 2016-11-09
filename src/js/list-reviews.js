'use strict';

function init() {
  var load = require('./load');
  var Review = require('./review');
  var container = document.querySelector('.reviews-list');
  var filters = document.querySelector('.reviews-filter');
  var controlReview = document.querySelector('.reviews-controls-more');
  /** @constant {string} */
  var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  /** @constant {number} */
  var PAGE_SIZE = 3;
  var pageNumber = 0;
  /** @type {Array.<Object>} */
  // var reviews = [];
  /** @type {Array.<Object>} */
  // var filteredHotels = [];
  /** @enum {number} */

  var filterId = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };

  var activeFilter = filterId.ALL;

  function hideFilter() {
    filters.classList.add('invisible');
  }
  function showFilter() {
    filters.classList.remove('invisible');
  }
  function showControlReview() {
    controlReview.classList.remove('invisible');
  }
  /**
   * Отрисовка отзывов
   * @param {Array.<Object>} reviews
   */
  function renderReviews(loaded) {
    loaded.forEach(function(item) {
      var reviewItem = new Review(item);
      container.appendChild(reviewItem.element);
    });
  }

 function changeFilter(filterID) {
    container.innerHTML = '';
    activeFilter = filterID;
    pageNumber = 0;
    loadHotels(filterID, pageNumber);
  };

  hideFilter();
  /**
   * Загрузка страницы
   * @param {Array.<Object>} filter
   * @param {number} currentPageNumber
   */
  function loadReviews(filter, currentPageNumber) {
    load(REVIEWS_LOAD_URL,
      {from: currentPageNumber * PAGE_SIZE,
        to: currentPageNumber * PAGE_SIZE + PAGE_SIZE
        filter: filter
      },
        renderReviews);
  }

  showFilter();
  showControlReview();

  loadReviews(0);
  /**
   * Проверка наличия загружаемых страниц
   * @param {Array} reviews
   * @param {number} page
   * @param {number} pageSize
   * @return {boolean}
   */
  // var isNextPageAvailable = function(reviews, page, pageSize) {
  //   return page < Math.floor(reviews.length / pageSize);
  // };

  controlReview.addEventListener('click', function() {
    // if (isNextPageAvailable(reviews, pageNumber, PAGE_SIZE)) {
    loadReviews(++pageNumber);
    // }
  });

  filters.addEventListener('change', function(evt) {
    // if (evt.target.classList.contains('reviews-filter-item')) {
      changeFilter(evt.target.id);
    // }
  });
}

module.exports.init = init;
