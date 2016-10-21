'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var fieldName = document.querySelector('#review-name');
  var fieldMarks = document.querySelector('.review-form')['review-mark'];
  var fieldText = document.querySelector('#review-text');
  var buttonSubmit = document.querySelector('.review-submit');
  var errorName = document.querySelector('.review-fields-name');
  var errorText = document.querySelector('.review-fields-text');
  var errorBox = document.querySelector('.review-fields');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      form.validate();
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    needToFillName: function() {
      return !fieldName.value;
    },

    needToFillText: function() {
      var mark = parseInt(fieldMarks.value, 10);
      return (mark < 3) && (!fieldText.value);
    },

    updateErrorNameVisible: function() {
      errorName.style.visibility = form.needToFillName() ? 'visible' : 'hidden';
    },

    updateErrorNTextVisible: function() {
      errorText.style.visibility = form.needToFillText() ? 'visible' : 'hidden';
    },

    updateErrorBoxVisible: function() {
      errorBox.style.visibility = form.needToFillName() || form.needToFillText() ? 'visible' : 'hidden';
    },

    validate: function() {
      form.updateErrorNameVisible();
      form.updateErrorNTextVisible();
      form.updateErrorBoxVisible();
      buttonSubmit.disabled = form.needToFillName() || form.needToFillText();
    }
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  fieldName.oninput = function() {
    form.validate();
  };

  fieldText.oninput = function() {
    form.validate();
  };

  for(var i = 0; i < fieldMarks.length; i++) {
    fieldMarks[i].onchange = function() {
      form.validate();
    };
  }

  function getStartDate() {
    var today = new Date();
    var year = today.getFullYear();
    var startDate = new Date(year, 11, 9);

    if (startDate > today) {
      year = year - 1;
    }
    startDate = new Date(year, 11, 9);
    return startDate;
  }

  function getDaysExpired() {
    var startDate = getStartDate();
    var today = new Date();
    var daysExpired = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    return daysExpired;
  }

  buttonSubmit.onclick = function() {
    var daysExpired = getDaysExpired();
    var name = fieldName.value;
    var mark = parseInt(fieldMarks.value, 10);
    Cookies.set('review-mark', mark, { expires: daysExpired });
    Cookies.set('review-name', name, { expires: daysExpired });
  };

  return form;
})();
