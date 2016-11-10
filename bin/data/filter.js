'use strict';

module.exports = function(list, filterId) {
  var filterType = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };
  var filteredReviews = list;

  switch(filterId) {
    case filterType.RECENT:
      filteredReviews = filteredReviews.filter(function(item) {
        return item.created > Date.now() - 3 * 24 * 60 * 60 * 1000;
      })
      .sort(function(a, b) {
        return b.created - a.created;
      });
      break;
    case filterType.GOOD:
      filteredReviews = filteredReviews.filter(function(item) {
        return item.rating >= 3;
      })
      .sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case filterType.BAD:
      filteredReviews = filteredReviews.filter(function(item) {
        return item.rating < 3;
      })
      .sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case filterType.POPULAR:
      filteredReviews = filteredReviews.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }
  return filteredReviews;
};
