"use strict";

/* global $ */

/* global View */
var MaintenanceView = View.extend({
  render: function render() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$setFocus = _ref.setFocus,
        setFocus = _ref$setFocus === void 0 ? false : _ref$setFocus;

    this.$el.html("<h2 tabindex=\"-1\">Under Maintenance</h2><div class=\"alert alert-warning\" role=\"alert\"><p>The application is currently under maintenance. Please try again later.</p></div>");

    if (setFocus) {
      $('h2', this.$el).first().focus();
    }

    return View.prototype.render.call(this, {
      setFocus: setFocus
    });
  }
});
/* exported MaintenanceView */