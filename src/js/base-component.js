'use strict';

var BaseComponent = function(el) {
  this.element = el;
  this.attachListeners();
  this.removeListeners();
};

BaseComponent.prototype.attachListeners = function() {
};

BaseComponent.prototype.append = function(container) {
  container.appendChild(this.element);
};

BaseComponent.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

BaseComponent.prototype.removeListeners = function() {
};

module.exports = BaseComponent;
