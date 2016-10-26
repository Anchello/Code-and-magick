'use strict';

function getReviewElement(reviews) {
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  var reviewElement = templateContainer.querySelector('.review').cloneNode(true);

  reviewElement.querySelector('.review-author').title = reviews.author.name;
  reviewElement.querySelector('.review-text').textContent = reviews.description;

  var numberStars = reviews.rating;
  var reviewRating = reviewElement.querySelector('.review-rating');

  reviewRating.style.display = 'inline-block';

  for(var i = 1; i < numberStars; i++) {
    reviewElement.insertBefore(reviewRating.cloneNode(true), reviewRating);
  }

  var IMAGE_LOAD_TIMEOUT = 10000;

  var imageAuthor = new Image(124, 124);
  var imageAuthorTimeout = null;

  imageAuthor.onload = function() {
    clearTimeout(imageAuthorTimeout);
    reviewElement.querySelector('.review-author').src = reviews.author.picture;
  };

  imageAuthor.onerror = function() {
    reviewElement.classList.add('review-load-failure');
  };

  imageAuthor.src = reviews.author.picture;

  imageAuthorTimeout = setTimeout(function() {
    reviewElement.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return reviewElement;
}

module.exports = getReviewElement;
