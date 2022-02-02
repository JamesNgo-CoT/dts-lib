/* global $ */
/* @if TARGET="BROWSER_ES5" || TARGET="BROWSER_ES6" **
/* global View */
/* @endif */
/* @if TARGET="BROWSER_ES6MODULE" */

import View from './view.js';
/* @endif */

const ErrorView = View.extend({
	render({ setFocus = false } = {}) {
		this.$el.html(`<h2 tabindex="-1">Error</h2><div class="alert alert-danger" role="alert"><p>The application has encountered an unknown error. Please try again later.</p></div>`);

		if (setFocus) {
			$('h2', this.$el).first().focus();
		}

		return View.prototype.render.call(this, { setFocus });
	}
});

/* @if TARGET="BROWSER_ES5" || TARGET="BROWSER_ES6" **
/* exported ErrorView */
/* @endif */
/* @if TARGET="BROWSER_ES6MODULE" */
export default ErrorView;
/* @endif */
