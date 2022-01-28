/* global $ */
/* @if TARGET="BROWSER-ES5" || TARGET="BROWSER-ES6" **
/* global Model */
/* @endif */
/* @if TARGET="BROWSER-ES6-MODULE" */

import Model from './model.js';
/* @endif */

const LoginModel = Model.extend({
	defaults: {
		app: 'cot-app'
	},

	idAttribute: 'sid',

	parse(response, options) {
		this.clear();
		return Model.prototype.parse.call(this, response, options);
	},

	login() {
		if (this.isNew()) {
			return this.save(null, {
				headers: {
					'Accept': 'application/json; charset=utf-8',
					'Content-Type': 'application/json; charset=utf-8'
				}
			});
		} else {
			return this.verify();
		}
	},

	logout() {
		if (!this.isNew()) {
			const userId = this.get('userID');
			return this.destroy({
				headers: {
					Authorization: userId
				}
			}).then(() => {
				this.reset();
			}).always(() => {
				return $.Deferred().resolve().promise();
			});
		} else {
			return $.Deferred().resolve().promise();
		}
	},

	verify() {
		if (this.isNew()) {
			return $.Deferred().reject().promise();
		}

		return this.fetch({
			headers: {
				'Accept': 'application/json; charset=utf-8',
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).catch(() => {
			return this.logout().always(() => {
				return $.Deferred().reject().promise();
			});
		});
	},
});

/* @if TARGET="BROWSER-ES5" || TARGET="BROWSER-ES6" **
/* exported LoginModel */
/* @endif */
/* @if TARGET="BROWSER-ES6-MODULE" */
export default LoginModel;
/* @endif */
