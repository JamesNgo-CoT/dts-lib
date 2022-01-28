/* global Backbone */

const View = Backbone.View.extend({
	swapWith(nextView, { render = false, setFocus = false } = {}) {
		this.$el.before(nextView.$el);
		this.remove();

		if (render) {
			nextView.render({ setFocus });
		}

		return nextView;
	}
}, {
	isNeeded() {
		return false;
	}
});

/* exported View */
