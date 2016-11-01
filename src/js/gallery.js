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

  var elements = Array.prototype.slice.call(this.element);

  elements.forEach(function(element, i) {
    element.addEventListener('click', function() {
      self.show(i);
    });
  });

  this.closeButton.onclick = function() {
    self.hide();
  };

  // this.controlLeft.addEventListener('click', function() {
  //   var index = self.activePicture - 1;
  //   if (index > -1) {
  //     self.setActivePicture(index);
  //   }
  // });
  //
  // this.controlRight.addEventListener('click', function() {
  //   var index = self.activePicture + 1;
  //   if (self.numberTotal > index) {
  //     self.setActivePicture(index);
  //   }
  // });
};

Gallery.prototype = {

  setActivePicture: function(index) {
    //принимает на вход число и записывает его в свойство activePicture
    this.activePicture = index;
    //находит в массиве pictures фотографию с нужным индексом, создает для нее DOM-элемент Image с помощью конструктора,
    // записывает ему src нужной фотографии и ставит его в конец блока overlay-gallery-preview
    var element = new Image(302, 302);
    element.src = this.pictures[index];
    var oldElement = this.preview.querySelector('img');
    if(oldElement) {
      this.preview.replaceChild(element, oldElement);
    } else {
      this.preview.appendChild(element);
    }
    //записывает номер показанной фотографии в блок preview-number-current
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

  show: function(index) {
    //Показывает фотогалерею, убирая у ее DOM-элемента класс invisible
    this.container.classList.remove('invisible');
    //Вызывает метод setActivePicture, передав в него параметром число, которое было передано параметром в show
    this.setActivePicture(index);
    // Добавляет обработчики событий DOM-элементам галереи.
    this.controlLeft.addEventListener('click', this.setLeft);
    this.controlRight.addEventListener('click', this.setRight);
  },

  hide: function() {
    //Добавлет DOM-элементу фотогалереи класс invisible.
    this.container.classList.add('invisible');
    // Удаляет обработчики событий, записывая в них значение null
    this.controlLeft.removeEventListener('click', this.setLeft);
    this.controlRight.removeEventListener('click', this.setRight);
  }
};

module.exports = Gallery;
