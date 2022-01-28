/* global $ */
import View from './view.js';

const ErrorView = View.extend({
	render({ setFocus = false } = {}) {
		this.$el.html(`<h2 tabindex="-1">Error</h2><div class="alert alert-danger" role="alert"><p>The application has encountered an unknown error. Please try again later.</p></div>`);

		if (setFocus) {
			$('h2', this.$el).first().focus();
		}

		return View.prototype.render.call(this, { setFocus });
	}
});

export default ErrorView;
