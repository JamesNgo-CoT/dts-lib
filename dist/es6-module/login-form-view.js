/* global $ */
import CotFormView from './cot-form-view.js';

const LoginFormView = CotFormView.extend({
	$user: null,
	sections: [{
		title: 'Login',

		rows: [{
				fields: [{
					type: 'html',
					html: 'Login using your City of Toronto username and password.'
				}]
			},
			{
				fields: [{
					id: 'user',
					title: 'User Name',
					required: true,
					bindTo: 'user',
					postRender() {
						this.$user = $('[name="user"]', this.$form).first();
					}
				}]
			},
			{
				fields: [{
					id: 'pwd',
					title: 'Password',
					type: 'password',
					required: true,
					bindTo: 'pwd'
				}]
			},
			{
				fields: [{
					type: 'html',
					html: `<button class="btn btn-primary" style="margin-bottom: 25px;">Login</button><p>Need help logging in? Contact <a href="mailto:itservice@toronto.ca">IT Service Desk</a> or call <a href="tel:416-338-2255">416-338-2255</a></p>`
				}]
			}
		]
	}],

	footer: null,

	setErrorMessage(...args) {
		if (this.$user) {
			// Dont know why, but this doesn't work unless it's inside a set timeout.
			setTimeout(() => void this.$user.focus(), 0);
		}

		return CotFormView.prototype.setErrorMessage.call(this, ...args);
	},
});

export default LoginFormView;
