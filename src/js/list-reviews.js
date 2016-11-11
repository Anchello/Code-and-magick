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
    showElement(filters);
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
      showElement(controlReview);
    } else {
      hideElement(controlReview);
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
  hideElement(filters);
  changeFilter(activeFilter);

  filters.addEventListener('change', function(evt) {
    if (evt.target.name === 'reviews') {
      changeFilter(evt.target.id);
    }
  }, true);

  controlReview.addEventListener('click', function() {
    loadReviews(activeFilter, ++pageNumber);
  });
}

module.exports.init = init;
