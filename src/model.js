/* global _ Backbone */

const Model = Backbone.Model.extend({
	url() {
		const urlError = function () {
			throw new Error('A "url" property or function must be specified');
		};

		const base =
			_.result(this, 'urlRoot') ||
			_.result(this.collection, 'url') ||
			urlError();

		if (this.isNew()) {
			return base;
		}

		const id = this.get(this.idAttribute);
		return `${base.replace(/\/$/, '')}('${encodeURIComponent(id)}')`;
	},

	save(key, val, options = {}) {
		let attrs;
		if (key == null || typeof key === 'object') {
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

	reset() {
		this.clear();
		this.set(_.result(this, 'defaults', {}));
		return this;
	},

	finalize() {
		return this;
	}
});

/* @if TARGET="BROWSER-ES5" || TARGET="BROWSER-ES6" **
/* exported Model */
/* @endif */
/* @if TARGET="BROWSER-ES6-MODULE" */
export default Model;
/* @endif */
