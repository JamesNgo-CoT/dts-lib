"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* global Backbone */
var Router = Backbone.Router.extend({
	beforeNextRouteCallback: null,
	hasRouted: false,
	execute: function execute(callback, args, name) {
		var _this = this;

		Promise.resolve().then(function() {
			if (_this.beforeNextRouteCallback) {
				return _this.beforeNextRouteCallback.call(_this, name);
			}

			return {};
		}).then(function() {
			var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
				_ref$preventDefault = _ref.preventDefault,
				preventDefault = _ref$preventDefault === void 0 ? false : _ref$preventDefault;

			if (preventDefault) {
				return Promise.reject();
			}

			return callback.call.apply(callback, [_this].concat(_toConsumableArray(args)));
		}).then(function(beforeNextRouteCallback) {
			if (!_this.hasRouted) {
				_this.hasRouted = true;
			}

			if (beforeNextRouteCallback) {
				_this.beforeNextRouteCallback = beforeNextRouteCallback;
			} else {
				_this.beforeNextRouteCallback = null;
			}
		}, function() {
			if (!_this.hasRouted) {
				_this.hasRouted = true;
			}
		});
	},
	lastFragment: null,
	route: function route(_route, name, callback) {
		var _this2 = this;

		var originalCallback = callback ? callback : name ? typeof name === 'function' ? name : this[name] : null;

		if (originalCallback && originalCallback !== this.routeDefault) {
			var newCallback = function newCallback() {
				_this2.lastFragment = Backbone.history.getFragment();

				for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return originalCallback.call.apply(originalCallback, [_this2].concat(args));
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

		return Backbone.Router.prototype.route.call(this, _route, name, callback);
	},
	defaultFragment: 'home',
	routeDefault: function routeDefault() {
		if (this.lastFragment == null) {
			// Null or undefined only.
			return void this.navigate(this.defaultFragment, {
				trigger: true
			});
		}

		this.navigate(this.lastFragment, {
			trigger: false,
			replace: true
		});
	},
	routes: {
		'home': function home() {
			return void 0;
		},
		// Match default fragment
		'*default': 'routeDefault'
	}
});
/* exported Router */
