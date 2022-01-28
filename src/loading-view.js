/* @if TARGET="BROWSER-ES5" || TARGET="BROWSER-ES6" **
/* global View */
/* @endif */
/* @if TARGET="BROWSER-ES6-MODULE" */
import View from './view.js';
/* @endif */

const LoadingView = View.extend({
	render(...args) {
		this.$el.html(`Loading…`);

		return View.prototype.render.call(this, ...args);
	}
});

/* @if TARGET="BROWSER-ES5" || TARGET="BROWSER-ES6" **
/* exported LoadingView */
/* @endif */
/* @if TARGET="BROWSER-ES6-MODULE" */
export default LoadingView;
/* @endif */
