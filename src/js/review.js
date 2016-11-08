'use strict';

var Review = function(data) {
  this.data = data;
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  this.element = templateContainer.querySelector('.review').cloneNode(true);

  this.element.querySelector('.review-author').title = this.data.author.name;
  this.element.querySelector('.review-text').textContent = this.data.description;

  var numberStars = this.data.rating;
  var reviewRating = this.element.querySelector('.review-rating');

  reviewRating.style.display = 'inline-block';

  for(var i = 1; i < numberStars; i++) {
    this.element.insertBefore(reviewRating.cloneNode(true), reviewRating);
  }

  var IMAGE_LOAD_TIMEOUT = 10000;

  var imageAuthor = new Image(124, 124);
  var imageAuthorTimeout = null;
  var self = this;

  imageAuthor.onload = function() {
    clearTimeout(imageAuthorTimeout);
    self.element.querySelector('.review-author').src = self.data.author.picture;
  };

  imageAuthor.onerror = function() {
    self.element.classList.add('review-load-failure');
  };

  imageAuthor.src = this.data.author.picture;

  imageAuthorTimeout = setTimeout(function() {
    self.element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);
  this.quiz = this.element.querySelector('.review-quiz');

  function _setActiveQuizAnswer(evt) {
    if (evt.target.classList.contains('review-quiz-answer')) {
      var activeQuizAnswer = evt.target.parentNode.querySelector('.review-quiz-answer-active');
      if (activeQuizAnswer) {
        activeQuizAnswer.classList.remove('review-quiz-answer-active');
      }
      evt.target.classList.add('review-quiz-answer-active');
    }
  };
  this.setActiveQuizAnswer = _setActiveQuizAnswer.bind(this);

  this.quiz.addEventListener('click', this.setActiveQuizAnswer);
};

Review.prototype = {
  remove: function() {
    this.quiz.removeEventListener('click', this.setActiveQuizAnswer);
  }
};

module.exports = Review;
