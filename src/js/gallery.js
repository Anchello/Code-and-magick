'use strict';

var Gallery = function(data) {
  this.pictures = data;
  this.element = document.querySelectorAll('.photogallery-image');
  this.container = document.querySelector('.overlay-gallery');
  this.preview = document.querySelector('.overlay-gallery-preview');
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');
  this.numberCurrentTag = document.querySelector('.preview-number-current');
  this.numberTotalTag = document.querySelector('.preview-number-total');
  this.closeButton = document.querySelector('.overlay-gallery-close');
  this.activePicture = null;
  this.numberTotal = this.element.length;

  var self = this;
  //Сохранение контекста в функции-обертке
  this.onClickLeft = this.setLeft.bind(this);
  this.onClickRight = this.setRight.bind(this);

  this.closeButton.onclick = function() {
    self.hide();
  };
};

Gallery.prototype = {
  /**
   * Создает новый элемент - изображение.
   * Устанавливает номер картинки в фотогаллерее
   * @param {number} index
   */
  setActivePicture: function(index) {
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
    this.numberTotalTag.textContent = this.element.length;

    return this.activePicture;
  },

  setLeft: function() {
    var prev = this.activePicture - 1;
    if (prev > -1) {
      this.setActivePicture(prev);
    }
  },

  setRight: function() {
    var next = this.activePicture + 1;
    if (this.numberTotal > next) {
      this.setActivePicture(next);
    }
  },
  /**
   * Показывает галлерею.
   * @param {number} index
   */
  show: function(index) {
    this.container.classList.remove('invisible');
    this.setActivePicture(index);
    this.controlLeft.addEventListener('click', this.onClickLeft);
    this.controlRight.addEventListener('click', this.onClickRight);
  },

  hide: function() {
    this.container.classList.add('invisible');
    this.controlLeft.removeEventListener('click', this.onClickLeft);
    this.controlRight.removeEventListener('click', this.onClickRight);
  }
};

module.exports = Gallery;
