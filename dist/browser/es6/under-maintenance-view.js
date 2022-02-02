/* global $ */
/* global View */

const MaintenanceView = View.extend({
	render({ setFocus = false } = {}) {
		this.$el.html(`<h2 tabindex="-1">Under Maintenance</h2><div class="alert alert-warning" role="alert"><p>The application is currently under maintenance. Please try again later.</p></div>`);

		if (setFocus) {
			$('h2', this.$el).first().focus();
		}

		return View.prototype.render.call(this, { setFocus });
	}
});

/* exported MaintenanceView */
