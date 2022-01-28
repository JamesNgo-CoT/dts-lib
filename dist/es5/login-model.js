"use strict";

/* global $ */

/* global Model */
var LoginModel = Model.extend({
	defaults: {
		app: 'cot-app'
	},
	idAttribute: 'sid',
	parse: function parse(response, options) {
		this.clear();
		return Model.prototype.parse.call(this, response, options);
	},
	login: function login() {
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
	logout: function logout() {
		var _this = this;

		if (!this.isNew()) {
			var userId = this.get('userID');
			return this.destroy({
				headers: {
					Authorization: userId
				}
			}).then(function() {
				_this.reset();
			}).always(function() {
				return $.Deferred().resolve().promise();
			});
		} else {
			return $.Deferred().resolve().promise();
		}
	},
	verify: function verify() {
		var _this2 = this;

		if (this.isNew()) {
			return $.Deferred().reject().promise();
		}

		return this.fetch({
			headers: {
				'Accept': 'application/json; charset=utf-8',
				'Content-Type': 'application/json; charset=utf-8'
			}
		})["catch"](function() {
			return _this2.logout().always(function() {
				return $.Deferred().reject().promise();
			});
		});
	}
});
/* exported LoginModel */
