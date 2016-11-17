'use strict';

function init() {
  var load = require('./load');
  var utils = require('./utils');
  var Review = require('./review');
  var container = document.querySelector('.reviews-list');
  var filters = document.querySelector('.reviews-filter');
  var controlReview = document.querySelector('.reviews-controls-more');
  var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  var PAGE_SIZE = 3;
  var pageNumber = 0;
  var activeFilter = 'reviews-all';
  /**
   * Проверка поддержки localStorage в браузере
   */
  function supportLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  /**
   * Установка последнего применненного фильтра по умолчанию
   */
  function setDefaultFilter() {
    if (supportLocalStorage()) {
      var valueFilter = localStorage.getItem('filter');
      if (valueFilter && document.getElementById(activeFilter)) {
        activeFilter = valueFilter;
        document.getElementById(activeFilter).checked = true;
      }
    }
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
  /**
   * Загрузка списка отзывов постранично
   * @param {Array.<Object>} filter
   * @param {number} currentPageNumber
   */
  function loadReviews(filter, currentPageNumber) {
    var params = {
      from: currentPageNumber * PAGE_SIZE,
      to: currentPageNumber * PAGE_SIZE + PAGE_SIZE,
      filter: filter
    };
    load(REVIEWS_LOAD_URL, params, onReviewsLoad);
    utils.showElement(filters);
  }
  /**
   * Выполнение после загрузки списка отзывов
   * @param {Array} loadedReviews
   */
  function onReviewsLoad(loadedReviews) {
    renderReviews(loadedReviews);
    setControlReviewVisible(loadedReviews);
  }
  /**
   * Установка видимость кнопки "Еще отзывы"
   * @param {Array} loadedReviews
   */
  function setControlReviewVisible(loadedReviews) {
    if (loadedReviews.length === PAGE_SIZE) {
      utils.showElement(controlReview);
    } else {
      utils.hideElement(controlReview);
    }
  }
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
  utils.hideElement(filters);
  setDefaultFilter();
  changeFilter(activeFilter);

  filters.addEventListener('change', function(evt) {
    if (evt.target.name === 'reviews') {
      changeFilter(evt.target.id);
    }
    if (supportLocalStorage()) {
      localStorage.setItem('filter', evt.target.id);
    }
  }, true);

  controlReview.addEventListener('click', function() {
    loadReviews(activeFilter, ++pageNumber);
  });

}

module.exports.init = init;
