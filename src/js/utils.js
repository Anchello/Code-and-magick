'use strict';

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
    var isThrottled = false,
      savedArgs,
      savedThis;
    function wrapper() {
      if (isThrottled) { // (2)
        savedArgs = arguments;
        savedThis = this;
        return;
      }
      fn.apply(this, arguments);
      isThrottled = true;
      setTimeout(function() {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, wait);
    }
    return wrapper;
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
   * @param {Object} elementq
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
  },
  /**
   * Наследование одного класс от другого, продлевая цепочку прототипов с использованием пустого конструктора
   * @param {Object} Child
   * @param {Object} Parent
   */
  inherit: function(Child, Parent) {
    var EmptyConstructor = function() {};
    EmptyConstructor.prototype = Parent.prototype;
    Child.prototype = new EmptyConstructor();
  }
};

module.exports = utils;
