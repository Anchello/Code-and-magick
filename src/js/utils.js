'use strict';

var lastCall = Date.now();
/**
 * @const
 * @type {string}
 */
var INVISIBLE_CLASS = 'invisible';

var utils = {
  /**
   * Оптимизация функции
   * @param {function} fn
   * @param {number} wait
   */
  throttle: function(fn, wait) {
    if (Date.now() - lastCall >= wait) {
      fn();
    }
    lastCall = Date.now();
  },
  /**
   * Проверка видимости элемента
   * @param {Object} element
   * @return {boolean}
   */
  isElementVisible: function(element) {
    var currentBottomElement = element.getBoundingClientRect().bottom;
    return currentBottomElement > 0;
  },
  /**
   * Скрытие элемента
   * @param {Object} element
   */
  hideElement: function(element) {
    element.classList.add(INVISIBLE_CLASS);
  },
  /**
   * Отображение элемента
   * @param {Object} element
   */
  showElement: function(element) {
    element.classList.remove(INVISIBLE_CLASS);
  }
};

module.exports = utils;
