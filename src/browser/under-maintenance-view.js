/* global $ */
/* @if TARGET="BROWSER_ES5" || TARGET="BROWSER_ES6" **
/* global View */
/* @endif */
/* @if TARGET="BROWSER_ES6MODULE" */

import View from './view.js';
/* @endif */

const MaintenanceView = View.extend({
	render({ setFocus = false } = {}) {
		this.$el.html(`<h2 tabindex="-1">Under Maintenance</h2><div class="alert alert-warning" role="alert"><p>The application is currently under maintenance. Please try again later.</p></div>`);

		if (setFocus) {
			$('h2', this.$el).first().focus();
		}

		return View.prototype.render.call(this, { setFocus });
	}
});

/* @if TARGET="BROWSER_ES5" || TARGET="BROWSER_ES6" **
/* exported MaintenanceView */
/* @endif */
/* @if TARGET="BROWSER_ES6MODULE" */
export default MaintenanceView;
/* @endif */
