'use strict';

var listReviews = require('./list-reviews');
listReviews.init();
var Game = require('./game');
var game = new Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);


var form = require('./form');
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

//В блоке main.js получите массив с адресами всех фотографий, лежащих в блоке photogallery
var picturesList = document.querySelectorAll('.photogallery-image img');
var pictures = Array.prototype.slice.call(picturesList);
var picturesSrc = pictures.map(function(item) {
  return item.getAttribute('src');
});

var Gallery = require('./gallery');
var gallery = new Gallery(picturesSrc);