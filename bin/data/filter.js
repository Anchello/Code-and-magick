'use strict';

module.exports = function(list, filterId) {
  var reviewsToFilter = list.slice(0);

  var filterType = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };

  switch(filterId) {
    case filterType.RECENT:
      var listFiltred = reviewsToFilter.filter(function(item) {
        return item.created > Date.now() - 3 * 24 * 60 * 60 * 1000;
      });
      return listFiltred.sort(function(a, b) {
        return b.created - a.created;
      });
      break;
    case filterType.GOOD:
      listFiltred = reviewsToFilter.filter(function(item) {
        return item.rating >= 3;
      });
      return listFiltred.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case filterType.BAD:
      listFiltred = reviewsToFilter.filter(function(item) {
        return item.rating < 3;
      });
      return listFiltred.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case filterType.POPULAR:
      return reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }

  return reviewsToFilter;
};
