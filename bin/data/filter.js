'use strict';

module.exports = function(list, filterID) {
  switch(filterID) {
    case filterId.RECENT:
      return list.slice(0, 1);
      break;
  }
  return list;
};
