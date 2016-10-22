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
      form.setFormValues();
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
    },

    getLastBirsdayTime: function() {
      var today = new Date();
      var currentYear = today.getFullYear();
      var birsday = new Date(currentYear, 11, 9);
      if(birsday.getTime() > today.getTime()) {
        return new Date(currentYear - 1, 11, 9);
      } else {
        return birsday;
      }
    },

    getDaysExpired: function() {
      var birsday = form.getLastBirsdayTime();
      var today = new Date();
      var daysExpired = Math.floor((today.getTime() - birsday.getTime()) / (1000 * 60 * 60 * 24));
      return daysExpired;
    },

    setCookiesValue: function() {
      var daysExpired = form.getDaysExpired();
      var name = fieldName.value;
      var mark = parseInt(fieldMarks.value, 10);
      window.Cookies.set('review-mark', mark, { expires: daysExpired });
      window.Cookies.set('review-name', name, { expires: daysExpired });
    },

    getCookieName: function() {
      var valueName = window.Cookies.get('review-name');
      return valueName;
    },

    getCookieMark: function() {
      var valueMark = window.Cookies.get('review-mark');
      return valueMark;
    },

    setFormValues: function() {
      var valueName = form.getCookieName();
      var valueMark = form.getCookieMark();
      if (typeof valueName !== 'undefined') {
        fieldName.value = valueName;
      }
      if (typeof valueMark !== 'undefined') {
        fieldMarks.value = valueMark;
      }
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

  buttonSubmit.onclick = function() {
    form.setCookiesValue();
  };

  return form;
})();
