'use strict';

(function() {

  var container = document.querySelector('.reviews-list');
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  var filter = document.querySelector('.reviews-filter');

  var IMAGE_LOAD_TIMEOUT = 10000;
  var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';

  function load(url, callback) {

    var JSONPCallback = 'cb' + Date.now();

    window[JSONPCallback] = function(data) {
      callback(data);
    };

    var script = document.createElement('script');
    script.src = url + '?callback=' + JSONPCallback;
    document.body.appendChild(script);
  }

  function hideFilter() {
    filter.classList.add('invisible');
  }

  function showFilter() {
    filter.classList.remove('invisible');
  }

  function getReviewElement(reviews) {
    var reviewElement = templateContainer.querySelector('.review').cloneNode(true);
    reviewElement.querySelector('.review-author').title = reviews.author.name;
    reviewElement.querySelector('.review-text').textContent = reviews.description;

    var numberStars = reviews.rating;
    var reviewRating = reviewElement.querySelector('.review-rating');
    reviewRating.style.display = 'inline-block';

    for(var i = 1; i < numberStars; i++) {
      reviewElement.insertBefore(reviewRating.cloneNode(true), reviewRating);
    }

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

  function renderReviews(reviews) {
    reviews.forEach(function(review) {
      container.appendChild(getReviewElement(review));
    });
  }

  hideFilter();

  load(REVIEWS_LOAD_URL, renderReviews);

  showFilter();
})();
