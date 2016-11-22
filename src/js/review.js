'use strict';

function getElement(data) {
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  var element = templateContainer.querySelector('.review').cloneNode(true);
  var numberStars = data.rating;
  var reviewRating = element.querySelector('.review-rating');
  var imageAuthor = new Image(124, 124);
  var imageAuthorTimeout = null;
  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;

  element.querySelector('.review-author').title = data.author.name;
  element.querySelector('.review-text').textContent = data.description;
  reviewRating.style.display = 'inline-block';

  for (var i = 1; i < numberStars; i++) {
    element.insertBefore(reviewRating.cloneNode(true), reviewRating);
  }

  imageAuthor.onload = function() {
    clearTimeout(imageAuthorTimeout);
    element.querySelector('.review-author').src = data.author.picture;
  };

  imageAuthor.onerror = function() {
    element.classList.add('review-load-failure');
  };

  imageAuthor.src = data.author.picture;

  imageAuthorTimeout = setTimeout(function() {
    element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);
  return element;
}

var Review = function(data) {
  this.data = data;
  this.element = getElement(data);

  this.quiz = this.element.querySelector('.review-quiz');
  this.setActiveQuizAnswer = this._setActiveQuizAnswer.bind(this);
};

Review.prototype = {
  /**
   * Установка класса "активный" у ответов "Да", "Нет" о пользе отзыва.
   * @param {ProgressEvent} evt
   */
  _setActiveQuizAnswer: function(evt) {
    if (evt.target.classList.contains('review-quiz-answer')) {
      var activeQuizAnswer = evt.target.parentNode.querySelector('.review-quiz-answer-active');
      if (activeQuizAnswer) {
        activeQuizAnswer.classList.remove('review-quiz-answer-active');
      }
      evt.target.classList.add('review-quiz-answer-active');
    }
  },
  /**
   * Установка обработчика событий.
   */
  init: function() {
    this.quiz.addEventListener('click', this.setActiveQuizAnswer);
  },
  /**
   * Удаление обработчика событий.
   */
  remove: function() {
    this.quiz.removeEventListener('click', this.setActiveQuizAnswer);
  }
};

module.exports = Review;
