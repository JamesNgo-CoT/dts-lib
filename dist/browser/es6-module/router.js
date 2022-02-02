/* global Backbone */

const Router = Backbone.Router.extend({
	beforeNextRouteCallback: null,
	hasRouted: false,
	execute(callback, args, name) {
		Promise.resolve()
			.then(() => {
				if (this.beforeNextRouteCallback) {
					return this.beforeNextRouteCallback.call(this, name);
				}

				return {};
			})
			.then(({ preventDefault = false } = {}) => {
				if (preventDefault) {
					return Promise.reject();
				}

				return callback.call(this, ...args);
			})
			.then((beforeNextRouteCallback) => {
				if (!this.hasRouted) {
					this.hasRouted = true;
				}

				if (beforeNextRouteCallback) {
					this.beforeNextRouteCallback = beforeNextRouteCallback;
				} else {
					this.beforeNextRouteCallback = null;
				}
			}, () => {
				if (!this.hasRouted) {
					this.hasRouted = true;
				}
			});
	},

	lastFragment: null,
	route(route, name, callback) {
		const originalCallback = callback
			? callback
			: name
				? typeof name === 'function'
					? name
					: this[name]
				: null;

		if (originalCallback && (originalCallback !== this.routeDefault)) {
			const newCallback = (...args) => {
				this.lastFragment = Backbone.history.getFragment();
				return originalCallback.call(this, ...args);
			};

			if (callback) {
				callback = newCallback;
			} else if (name) {
				if (typeof name === 'function') {
					name = newCallback;
				} else if (typeof name === 'string') {
					this[name] = newCallback;
				}
			}
		}

		return Backbone.Router.prototype.route.call(this, route, name, callback);
	},

	defaultFragment: 'home',
	routeDefault() {
		if (this.lastFragment == null) { // Null or undefined only.
			return void this.navigate(this.defaultFragment, { trigger: true });
		}

		this.navigate(this.lastFragment, { trigger: false, replace: true });
	},
	routes: {
		'home': () => void (0), // Match default fragment
		'*default': 'routeDefault'
	}
});

export default Router;
