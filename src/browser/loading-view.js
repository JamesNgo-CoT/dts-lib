/* @if TARGET="BROWSER_ES5" || TARGET="BROWSER_ES6" **
/* global View */
/* @endif */
/* @if TARGET="BROWSER_ES6MODULE" */
import View from './view.js';
/* @endif */

const LoadingView = View.extend({
	render(...args) {
		this.$el.html(`Loading…`);

		return View.prototype.render.call(this, ...args);
	}
});

/* @if TARGET="BROWSER_ES5" || TARGET="BROWSER_ES6" **
/* exported LoadingView */
/* @endif */
/* @if TARGET="BROWSER_ES6MODULE" */
export default LoadingView;
/* @endif */
