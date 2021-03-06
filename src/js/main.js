'use strict';

var listReviews = require('./list-reviews');
var Game = require('./game');
var form = require('./form');
var Gallery = require('./gallery');
var game = new Game(document.querySelector('.demo'));

var init = {
  game: function() {
    game.initializeLevelAndStart();
    game.setGameStatus(Game.Verdict.INTRO);
  },
  form: function() {
    var formOpenButton = document.querySelector('.reviews-controls-new');
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
  },
  gallery: function() {
    var picturesList = document.querySelectorAll('.photogallery-image img');
    var pictures = Array.prototype.slice.call(picturesList);
    var dataPictures = pictures.map(function(item) {
      return item.getAttribute('src');
    });

    var gallery = new Gallery(dataPictures);
    var galleryButtonsList = document.querySelectorAll('.photogallery-image');
    var galleryButtons = Array.prototype.slice.call(galleryButtonsList);

    galleryButtons.forEach(function(element, index) {
      element.addEventListener('click', function() {
        gallery.show(index);
      });
    });
  },
  review: function() {
    listReviews.init();
  }
};

init.game();
init.form();
init.gallery();
init.review();
