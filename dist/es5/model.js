"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) { return typeof obj; } : function(obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/* global _ Backbone */
var Model = Backbone.Model.extend({
	url: function url() {
		var urlError = function urlError() {
			throw new Error('A "url" property or function must be specified');
		};

		var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();

		if (this.isNew()) {
			return base;
		}

		var id = this.get(this.idAttribute);
		return "".concat(base.replace(/\/$/, ''), "('").concat(encodeURIComponent(id), "')");
	},
	save: function save(key, val) {
		var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		var attrs;

		if (key == null || _typeof(key) === 'object') {
			attrs = key;
			options = val;
		} else {
			attrs = {};
			attrs[key] = val;
		}

		this.finalize();
		attrs = Object.assign({}, this.attributes, attrs);
		delete attrs['@odata.etag'];
		delete attrs['__CreatedOn'];
		delete attrs['__ModifiedOn'];
		delete attrs['__Owner'];
		options.data = JSON.stringify(attrs);
		return Backbone.Model.prototype.save.call(this, key, val, options);
	},
	reset: function reset() {
		this.clear();
		this.set(_.result(this, 'defaults', {}));
		return this;
	},
	finalize: function finalize() {
		return this;
	}
});
/* exported Model */
