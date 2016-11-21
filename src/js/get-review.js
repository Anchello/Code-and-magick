'use strict';

module.exports = function(data) {
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

  for(var i = 1; i < numberStars; i++) {
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
};
