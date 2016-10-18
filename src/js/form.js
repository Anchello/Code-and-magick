'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var fieldName = document.querySelector('#review-name');
  var fieldMarks = document.getElementsByName('review-mark');
  var fieldText = document.querySelector('#review-text');
  var buttonSubmit = document.querySelector('.review-submit');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      buttonSubmit.disabled = true;
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    validateFields: function() {
      var errorName = document.querySelector('.review-fields-name');
      var errorText = document.querySelector('.review-fields-text');
      var errorMessage = document.querySelector('.review-fields');

      if (!fieldName.value && !fieldText.value) {
        errorMessage.style.display = 'inline-block';
        errorText.style.display = 'inline';
        errorName.style.display = 'inline';
      } else if ( !fieldName.value ) {
        errorMessage.style.display = 'inline-block';
        errorName.style.display = 'inline';
        errorText.style.display = 'none';
      } else if ( !fieldText.value ) {
        errorMessage.style.display = 'inline-block';
        errorName.style.display = 'none';
        errorText.style.display = 'inline';
      } else {
        errorMessage.style.display = 'none';
        buttonSubmit.disabled = false;
      }
    },

  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  fieldMarks.forEach(function(item) {
    item.onchange = function() {
      var valueMark = item.value;
      return valueMark;
    };
  });

  fieldName.oninput = function() {
    form.validateFields();
  };

  fieldText.onchange = function() {
    form.validateFields();
  };

  return form;
})();
