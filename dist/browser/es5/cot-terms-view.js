"use strict";

/* global $ _ */

/* global View */
var CotTermsView = View.extend({
  termsText: null,
  disagreedText: null,
  agreedCookieName: function agreedCookieName() {
    return _.result(this.constructor, 'agreedCookieName');
  },
  agreementTitle: null,
  agreeText: null,
  agreeButton: null,
  render: function render() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$setFocus = _ref.setFocus,
        setFocus = _ref$setFocus === void 0 ? false : _ref$setFocus;

    this.$el.empty();
    var options = {
      containerSelector: this.$el,
      onAgreed: function onAgreed() {
        _this.trigger('agreed');
      }
    };

    var termsText = _.result(this, 'termsText');

    if (termsText) {
      options.termsText = termsText;
    }

    var disagreedText = _.result(this, 'disagreedText');

    if (disagreedText) {
      options.disagreedText = disagreedText;
    }

    var agreedCookieName = _.result(this, 'agreedCookieName');

    if (agreedCookieName) {
      options.agreedCookieName = agreedCookieName;
    }

    var agreementTitle = _.result(this, 'agreementTitle');

    if (agreementTitle) {
      options.agreementTitle = agreementTitle;
    }

    var agreeText = _.result(this, 'agreeText');

    if (agreeText) {
      options.agreeText = agreeText;
    }

    var agreeButton = _.result(this, 'agreeButton');

    if (agreeButton) {
      options.agreeButton = agreeButton;
    }

    var cotApp = window['cot_app'] || window['CotApp'];
    cotApp.showTerms(options);
    var $termsAgree = $('#termsAgree'); // Dont know why, but this doesn't work unless it's inside a set timeout.

    var onError = function onError() {
      return void setTimeout(function () {
        return void $termsAgree.focus();
      }, 0);
    };

    $termsAgree.on('click', function () {
      if (!$termsAgree.is(':checked')) {
        onError();
      }
    });
    var $cotTermsAgree = $("#cot-terms-agree");
    $cotTermsAgree.on('click', function () {
      if (!$termsAgree.is(':checked')) {
        onError();
      }
    });
    var $title = $('h2', this.$el).attr('tabindex', '-1').first();

    if (setFocus) {
      $title.focus();
    }

    return View.prototype.render.call(this, {
      setFocus: setFocus
    });
  }
}, {
  agreedCookieName: 'terms',
  isNeeded: function isNeeded() {
    var agreedCookieName = _.result(this, 'agreedCookieName');

    var regExp = new RegExp('(?:(?:^|.*;\\s*)'.concat(encodeURI(agreedCookieName), '\\s*\\=\\s*([^;]*).*$)|^.*$'));
    return document.cookie.replace(regExp, '$1') !== 'agree';
  }
});
/* exported CotTermsView */