'use strict';

var listReviews = require('./list-reviews');
var Game = require('./game');
var form = require('./form');
var Gallery = require('./gallery');

var game = new Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

listReviews.init();

var formOpenButton = document.querySelector('.reviews-controls-new');

/** @param {MouseEvent} evt */
formOpenButton.onclick = function(evt) {
  evt.preventDefault();

  form.open(function() {
    game.setGameStatus(Game.Verdict.PAUSE);
    game.setDeactivated(true);
  });
};

form.onClose = function() {
  game.setDeactivated(false);
};

var picturesList = document.querySelectorAll('.photogallery-image img');
var pictures = Array.prototype.slice.call(picturesList);
var dataPictures = pictures.map(function(item) {
  return item.getAttribute('src');
});

var overlayGallery = document.querySelector('.overlay-gallery');
var gallery = new Gallery(dataPictures, overlayGallery);
var galleryButtonsList = document.querySelectorAll('.photogallery-image');
var galleryButtons = Array.prototype.slice.call(galleryButtonsList);

galleryButtons.forEach(function(element, index) {
  element.addEventListener('click', function() {
    gallery.show(index);
  });
});

