'use strict';

var BaseComponent = require('./base-component');
var utils = require('./utils');

var Gallery = function(data, el) {
  this.pictures = data;
  this.image = document.querySelectorAll('.photogallery-image');
  this.preview = document.querySelector('.overlay-gallery-preview');
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');
  this.numberCurrentTag = document.querySelector('.preview-number-current');
  this.numberTotalTag = document.querySelector('.preview-number-total');
  this.closeButton = document.querySelector('.overlay-gallery-close');
  this.activePicture = null;
  this.numberTotal = this.image.length;
  BaseComponent.call(this, el);

  this.onClickLeft = this.setLeft.bind(this);
  this.onClickRight = this.setRight.bind(this);
  this.hide = this.hide.bind(this);
};

utils.inherit(Gallery, BaseComponent);
/**
 * Создает новый элемент - изображение.
 * Устанавливает номер картинки в фотогалерее
 * @param {number} index
 */
Gallery.prototype.setActivePicture = function(index) {
  this.activePicture = index;
  var element = new Image(500, 500);
  element.src = this.pictures[index];
  var oldElement = this.preview.querySelector('img');
  if(oldElement) {
    this.preview.replaceChild(element, oldElement);
  } else {
    this.preview.appendChild(element);
  }
  this.numberCurrentTag.textContent = (this.activePicture + 1);
  this.numberTotalTag.textContent = this.image.length;

  return this.activePicture;
};

Gallery.prototype.setLeft = function() {
  var prev = this.activePicture - 1;
  if (prev > -1) {
    this.setActivePicture(prev);
  }
};

Gallery.prototype.setRight = function() {
  var next = this.activePicture + 1;
  if (this.numberTotal > next) {
    this.setActivePicture(next);
  }
};
/**
 * Показывает галерею.
 * @param {number} index
 */
Gallery.prototype.show = function(index) {
  utils.showElement(this.element);
  this.setActivePicture(index);
  this.attachListeners();
};
/**
 * Скрывает галерею и удаляет обработчики событий.
 */
Gallery.prototype.hide = function() {
  utils.hideElement(this.element);
  this.removeListeners();
};
/**
 * Добавляет обработчики событий.
 */
Gallery.prototype.attachListeners = function() {
  this.controlLeft.addEventListener('click', this.onClickLeft);
  this.controlRight.addEventListener('click', this.onClickRight);
  this.closeButton.addEventListener('click', this.hide);
};
/**
 * Удаляет обработчики событий.
 */
Gallery.prototype.removeListeners = function() {
  this.controlLeft.removeEventListener('click', this.onClickLeft);
  this.controlRight.removeEventListener('click', this.onClickRight);
  this.closeButton.removeEventListener('click', this.hide);
};

module.exports = Gallery;
