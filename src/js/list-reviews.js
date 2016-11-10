'use strict';

function init() {
  var load = require('./load');
  var Review = require('./review');
  var container = document.querySelector('.reviews-list');
  var filters = document.querySelector('.reviews-filter');
  var controlReview = document.querySelector('.reviews-controls-more');
  var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  var PAGE_SIZE = 3;
  var pageNumber = 0;
  var activeFilter = 'reviews-all';
  /**
   * Скрытие элемента
   * @param {Object} element
   */
  function hideElement(element) {
    element.classList.add('invisible');
  }
  /**
   * Отображение элемента
   * @param {Object} element
   */
  function showElement(element) {
    element.classList.remove('invisible');
  }
  /**
   * Отрисовка отзыва
   * @param {Array.<Object>} loadedReviews
   */
  function renderReviews(loadedReviews) {
    loadedReviews.forEach(function(item) {
      var reviewItem = new Review(item);
      container.appendChild(reviewItem.element);
    });
  }

  hideElement(filters);
  /**
   * Загрузка списка отзывов постранично
   * @param {Array.<Object>} filter
   * @param {number} currentPageNumber
   */
  function loadReviews(filter, currentPageNumber) {
    load(REVIEWS_LOAD_URL,
      {from: currentPageNumber * PAGE_SIZE,
        to: currentPageNumber * PAGE_SIZE + PAGE_SIZE,
        filter: filter
      },
        renderReviews);
  }

  showElement(filters);
  showElement(controlReview);
  /**
   * Изменение фильтра, очистка списка и его новая загрузка
   * @param {Array.<Object>} filter
   */
  function changeFilter(filter) {
    container.innerHTML = '';
    activeFilter = filter;
    pageNumber = 0;
    loadReviews(filter, pageNumber);
  }

  filters.addEventListener('change', function(evt) {
    if (evt.target.name === 'reviews') {
      changeFilter(evt.target.id);
    }
  }, true);

  /**
   * Проверка наличия загружаемых страниц
   * @param {Array} reviews
   * @param {number} page
   * @param {number} pageSize
   * @return {boolean}
   */
  // function isNextPageAvailable(reviews, page, pageSize) {
  //   return page < Math.floor(reviews.length / pageSize);
  // }

  controlReview.addEventListener('click', function() {
    loadReviews(activeFilter, ++pageNumber);
    // if (isNextPageAvailable(loadedReviews, pageNumber, PAGE_SIZE)) {
    // loadReviews(activeFilter, ++pageNumber);
    // }
  });

  changeFilter(activeFilter);
}

module.exports.init = init;
