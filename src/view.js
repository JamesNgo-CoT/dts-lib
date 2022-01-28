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

/* @if TARGET="BROWSER-ES5" || TARGET="BROWSER-ES6" **
/* exported View */
/* @endif */
/* @if TARGET="BROWSER-ES6-MODULE" */
export default View;
/* @endif */
