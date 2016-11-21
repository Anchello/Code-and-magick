'use strict';

var BaseComponent = require('./base-component');
var utils = require('./utils');

function getElement(data, el) {
  // var template = document.querySelector('template');
  // var templateContainer = 'content' in template ? template.content : template;
  // var element = templateContainer.querySelector('.review').cloneNode(true);
  var numberStars = data.rating;
  var reviewRating = el.querySelector('.review-rating');
  var imageAuthor = new Image(124, 124);
  var imageAuthorTimeout = null;
  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;

  el.querySelector('.review-author').title = data.author.name;
  el.querySelector('.review-text').textContent = data.description;
  reviewRating.style.display = 'inline-block';

  for(var i = 1; i < numberStars; i++) {
    el.insertBefore(reviewRating.cloneNode(true), reviewRating);
  }

  imageAuthor.onload = function() {
    clearTimeout(imageAuthorTimeout);
    el.querySelector('.review-author').src = data.author.picture;
  };

  imageAuthor.onerror = function() {
    el.classList.add('review-load-failure');
  };

  imageAuthor.src = data.author.picture;

  imageAuthorTimeout = setTimeout(function() {
    el.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);
  return el;
}

var Review = function(data, el) {
  this.data = data;
  BaseComponent.call(this, getElement(data, el));
  this.quiz = this.element.querySelector('.review-quiz');
  this.setActiveQuizAnswer = this._setActiveQuizAnswer.bind(this);
};

utils.inherit(Review, BaseComponent);

/**
 * Установка класса "активный" у ответов "Да", "Нет" о пользе отзыва.
 * @param {ProgressEvent} evt
 */
Review.prototype._setActiveQuizAnswer = function(evt) {
  if (evt.target.classList.contains('review-quiz-answer')) {
    var activeQuizAnswer = evt.target.parentNode.querySelector('.review-quiz-answer-active');
    if (activeQuizAnswer) {
      activeQuizAnswer.classList.remove('review-quiz-answer-active');
    }
    evt.target.classList.add('review-quiz-answer-active');
  }
};
/**
 * Установка обработчика событий.
 */
Review.prototype.attachListeners = function() {
  this.quiz.addEventListener('click', this.setActiveQuizAnswer);
  // BaseComponent.prototype.append.call(this, container);
};
/**
 * Удаление обработчика событий.
 */
Review.prototype.removeListeners = function() {
  this.quiz.removeEventListener('click', this.setActiveQuizAnswer);
  BaseComponent.prototype.remove.call(this);
};

module.exports = Review;
