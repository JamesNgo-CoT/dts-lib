"use strict";

/* global Backbone */
var View = Backbone.View.extend({
	swapWith: function swapWith(nextView) {
		var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			_ref$render = _ref.render,
			render = _ref$render === void 0 ? false : _ref$render,
			_ref$setFocus = _ref.setFocus,
			setFocus = _ref$setFocus === void 0 ? false : _ref$setFocus;

		this.$el.before(nextView.$el);
		this.remove();

		if (render) {
			nextView.render({
				setFocus: setFocus
			});
		}

		return nextView;
	}
}, {
	isNeeded: function isNeeded() {
		return false;
	}
});
/* exported View */
