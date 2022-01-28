import View from './view.js';

const LoadingView = View.extend({
	render(...args) {
		this.$el.html(`Loading…`);

		return View.prototype.render.call(this, ...args);
	}
});

export default LoadingView;
