'use strict';

function init() {
  var load = require('./load');
  var Review = require('./review');
  var list = require('../../bin/data/get-page');
  var container = document.querySelector('.reviews-list');
  var filter = document.querySelector('.reviews-filter');
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


  function hideFilter() {
    filter.classList.add('invisible');
  }
  function showFilter() {
    filter.classList.remove('invisible');
  }
  function showControlReview() {
    controlReview.classList.remove('invisible');
  }
  /**
   * Отрисовка отзывов
   * @param {Array.<Object>} reviews
   */
  function renderReviews(loadedReviews) {
    /** @type {number} */
    // var page = 0;
    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    list(loadedReviews, from, to).forEach(function(item) {
      var reviewItem = new Review(item);
      container.appendChild(reviewItem.element);
    });
  }

  hideFilter();
  /**
   * Загрузка страницы
   * @param {Array.<Object>} filter
   * @param {number} currentPageNumber
   */
  function loadReviews(currentPageNumber) {
    load(REVIEWS_LOAD_URL,
      {from: currentPageNumber * PAGE_SIZE,
        to: currentPageNumber * PAGE_SIZE + PAGE_SIZE
        // filter: filter
      }, renderReviews);
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
    pageNumber++;
    loadReviews(pageNumber);
    console.log(pageNumber);
    // }
  });
}

module.exports.init = init;
