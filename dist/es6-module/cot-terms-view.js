/* global $ _ */
import View from './view.js';

const CotTermsView = View.extend({
	termsText: null,
	disagreedText: null,
	agreedCookieName() {
		return _.result(this.constructor, 'agreedCookieName');
	},
	agreementTitle: null,
	agreeText: null,
	agreeButton: null,

	render({ setFocus = false } = {}) {
		this.$el.empty();

		const options = {
			containerSelector: this.$el,
			onAgreed: () => {
				this.trigger('agreed');
			}
		};

		const termsText = _.result(this, 'termsText');
		if (termsText) {
			options.termsText = termsText;
		}

		const disagreedText = _.result(this, 'disagreedText');
		if (disagreedText) {
			options.disagreedText = disagreedText;
		}

		const agreedCookieName = _.result(this, 'agreedCookieName');
		if (agreedCookieName) {
			options.agreedCookieName = agreedCookieName;
		}

		const agreementTitle = _.result(this, 'agreementTitle');
		if (agreementTitle) {
			options.agreementTitle = agreementTitle;
		}

		const agreeText = _.result(this, 'agreeText');
		if (agreeText) {
			options.agreeText = agreeText;
		}

		const agreeButton = _.result(this, 'agreeButton');
		if (agreeButton) {
			options.agreeButton = agreeButton;
		}

		const cotApp = window['cot_app'] || window['CotApp'];
		cotApp.showTerms(options);

		const $termsAgree = $('#termsAgree');

		// Dont know why, but this doesn't work unless it's inside a set timeout.
		const onError = () => void setTimeout(() => void $termsAgree.focus(), 0);

		$termsAgree.on('click', () => {
			if (!$termsAgree.is(':checked')) {
				onError();
			}
		});

		const $cotTermsAgree = $("#cot-terms-agree");
		$cotTermsAgree.on('click', () => {
			if (!$termsAgree.is(':checked')) {
				onError();
			}
		});

		const $title = $('h2', this.$el).attr('tabindex', '-1').first();
		if (setFocus) {
			$title.focus();
		}

		return View.prototype.render.call(this, { setFocus });
	}
}, {
	agreedCookieName: 'terms',
	isNeeded() {
		const agreedCookieName = _.result(this, 'agreedCookieName');
		const regExp = new RegExp('(?:(?:^|.*;\\s*)'.concat(encodeURI(agreedCookieName), '\\s*\\=\\s*([^;]*).*$)|^.*$'));
		return document.cookie.replace(regExp, '$1') !== 'agree';
	}
});

export default CotTermsView;
