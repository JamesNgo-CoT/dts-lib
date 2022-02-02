"use strict";

/* global View */
var LoadingView = View.extend({
  render: function render() {
    var _View$prototype$rende;

    this.$el.html("Loading\u2026");

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_View$prototype$rende = View.prototype.render).call.apply(_View$prototype$rende, [this].concat(args));
  }
});
/* exported LoadingView */