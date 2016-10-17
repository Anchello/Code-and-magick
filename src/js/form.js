'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var fieldName = document.querySelector('#review-name');
  var fieldMarks = document.getElementsByName('review-mark');
  var fieldText = document.getElementsByName('#review-text');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    validateName: function() {
      var errorName = document.querySelector('.review-fields-name');

      if (!fieldName.value) {
        errorName.style.display = 'inline';
      } else {
        errorName.style.display = 'none';
      }
    },

    validateText: function() {
      var errorText = document.querySelector('.review-fields-text');

      if (!fieldText.value) {
        errorText.style.display = 'inline';
      } else {
        errorText.style.display = 'none';
      }
    }
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  fieldMarks.forEach(function(item) {
    item.onchange = function() {
      var valueMark = item.value;
    };
  });

  fieldName.oninput = function() {
    form.validateName();
  };
  
  fieldText.onchange = function() {
    form.validateText();
  };

  return form;
})();
