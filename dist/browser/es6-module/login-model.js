import Model from './model.js';

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
		if (!this.isNew()) {
			return this.verify();
		}

		return new Promise((resolve, reject) => {
			this.save(null, {
				headers: {
					'Accept': 'application/json; charset=utf-8',
					'Content-Type': 'application/json; charset=utf-8'
				}
			}).then((data) => {
				this.setLastVerified(new Date());
				resolve(data);
			}, (jqXHR, textStatus, errorThrown) =>  {
				reject(errorThrown);
			});
		});
	},

	logout() {
		if (this.isNew()) {
			return Promise.resolve();
		}

		return new Promise((resolve) => {
			this.destroy({
				headers: {
					'Authorization': this.attributes.userID
				}
			}).then(() => {
				this.reset();
				this.setLastVerified(null);
				resolve();
			}, () => {
				resolve();
			});
		});
	},

	verify() {
		if (this.isNew()) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			this.fetch({
				headers: {
					'Accept': 'application/json; charset=utf-8',
					'Content-Type': 'application/json; charset=utf-8'
				}
			}).then((data) => {
				this.setLastVerified(new Date());
				resolve(data);
			}, (jqXHR, textStatus, errorThrown) => {
				return this.logout().then(() => {
					reject(errorThrown);
				});
			});
		});
	},

	lastVerified: null,
	preTimeout: null,
	preTimeoutDelay: 1770000, // (30 * 60 * 1000) - (10 * 1000) = 1770000
	timeout: null,
	timeoutDelay: 1800000, // 30 * 60 * 1000 = 1800000
	setLastVerified(date) {
		if (this.preTimeout) {
			clearTimeout(this.preTimeout);
			this.preTimeout = null;
		}

		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		if (date) {
			this.lastVerified = date;

			this.preTimeout = setTimeout(() => void this.trigger('pretimeout'), this.preTimeoutDelay);
			this.timeout = setTimeout(() => void this.trigger('timeout'), this.timeoutDelay);
		} else {
			this.lastVerified = null;
		}
	}
});

export default LoginModel;
