/* global $ _ CotForm */
/* @if TARGET="BROWSER-ES5" || TARGET="BROWSER-ES6" **
/* global View */
/* @endif */
/* @if TARGET="BROWSER-ES6-MODULE" */

import View from './view.js';
/* @endif */

const CotFormView = View.extend({
	$liveRegion: null,
	initialize(...args) {
		this.$liveRegion = $('.js-aria-live.sr-only, .ui-helper-hidden-accessible').first();
		return View.prototype.initialize.call(this, ...args);
	},

	formId: null,
	rootPath: null,
	sections: null,
	success(event) {
		event.preventDefault();
		this.removeErrorMessage();
		this.trigger('success');
		return false;
	},
	title: null,
	definition() {
		const formId = _.result(this, 'formId');
		const id = _.result(this, 'id');
		return {
			id: formId ? formId : id ? `${id}Form` : null,
			rootPath: _.result(this, 'rootPath'),
			sections: _.result(this, 'sections'),
			success: (event) => this.success(event),
			title: _.result(this, 'title'),
			useBinding: true
		};
	},

	$alert: null,
	$form: null,
	footer: '<p><button class="btn btn-primary btn-lg">Submit</button></p>',
	formValidator: null,
	postRender: null,
	preRender: null,
	render({ setFocus = false } = {}) {
		this.$el.empty();

		const definition = Object.assign({}, _.result(this, 'definition', {}));
		const loopDefinition = (callback) => {
			if (definition.sections) {
				const sections = definition.sections;
				for (let sIndex = 0, sLength = sections.length; sIndex < sLength; sIndex++) {
					const section = sections[sIndex];
					callback('section', section);

					if (section.rows) {
						const rows = section.rows;
						for (let rIndex = 0, rLength = rows.length; rIndex < rLength; rIndex++) {
							const row = rows[rIndex];
							callback('row', row);

							// FIELDS
							if (row.fields) {
								const fields = row.fields;
								for (let fIndex = 0, fLength = fields.length; fIndex < fLength; fIndex++) {
									const field = fields[fIndex];
									callback('field', field);
								}
								continue;
							}

							// GRID
							if (row.grid) {
								const grid = row.grid;
								callback('grid', grid);

								if (grid.fields) {
									const fields = grid.fields;
									for (let fIndex = 0, fLength = fields.length; fIndex < fLength; fIndex++) {
										const field = fields[fIndex];
										callback('gridField', field);
									}
								}
								continue;
							}

							// REPEAT CONTROL
							if (row.repeatControl) {
								const repeatControl = row.repeatControl;
								callback('repeatControl', repeatControl);

								if (repeatControl.rows) {
									const rows = repeatControl.rows;
									for (let rIndex = 0, rLength = rows.length; rIndex < rLength; rIndex++) {
										const row = rows[rIndex];
										callback('repeatControlRow', row);

										if (row.fields) {
											const fields = row.fields;
											for (let fIndex = 0, fLength = fields.length; fIndex < fLength; fIndex++) {
												const field = fields[fIndex];
												callback('repeatControlField', field);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		};

		if (this.preRender) {
			this.preRender.call(this, definition, this);
		}

		loopDefinition((type, definition) => {
			switch (type) {
				case 'field':
				case 'gridField':
				case 'repeatControlField': {
					for (const key in definition) {
						if (key !== 'onclick' && key !== 'preRender' && key !== 'postRender') {
							definition[key] = _.result(definition, key);
						}
					}

					if (this.model && definition.bindTo && definition.choices) {
						if (this.model.has(definition.bindTo)) {
							const values = Array.isArray(this.model.attributes[definition.bindTo]) ?
								this.model.attributes[definition.bindTo] :
								[this.model.attributes[definition.bindTo]];

							const choices = definition.choices.map(({ text, value }) => value || text);
							for (let index = values.length - 1; index >= 0; index--) {
								const value = values[index];
								if (choices.indexOf(value) === -1) {
									definition.choices.unshift({ text: value });
								}
							}
						}
					}

					break;
				}
			}

			if (definition.preRender) {
				definition.preRender.call(this, definition, this);
			}
		});

		const cotForm = new CotForm(definition);
		cotForm.render({ target: this.$el });
		if (this.model) {
			cotForm.setModel(this.model);
		}

		this.$form = $('form', this.$el).first();
		this.formValidator = this.$form.data('formValidation');

		this.$alert = $('<div role="alert"></div>');
		$('.panel:first', this.$form).before(this.$alert);

		this.$form.append(_.result(this, 'footer', ''));

		loopDefinition((type, definition) => {
			if (definition.postRender) {
				definition.postRender.call(this, definition, this);
			}
		});

		if (this.postRender) {
			this.postRender.call(this, definition, this);
		}

		const $title = $('h2', this.$form).attr('tabindex', '-1').first();
		if (setFocus) {
			$title.focus();
		}

		return this;
	},

	disabledElements: null,
	disableFields() {
		this.$disabledElements = this.$form.find('button, input, select, textarea').filter(':enabled:visible').prop('disabled', true);
		this.$liveRegion.html('Form fields are disabled');

		return this;
	},
	enableFields() {
		if (this.$disabledElements) {
			this.$disabledElements.prop('disabled', false);
			this.$disabledElements = null;
		}

		this.$liveRegion.html('Form fields are enabled');

		return this;
	},

	setErrorMessage(message) {
		// Dont know why, but this doesn't work unless it's inside a set timeout.
		setTimeout(() => void this.formValidator.resetForm(false), 0);

		this.$alert.addClass('alert alert-danger');
		this.$alert.html(message);

		return this;
	},
	removeErrorMessage() {
		this.$alert.removeClass('alert alert-danger');
		this.$alert.html('');

		return this;
	},
});

/* @if TARGET="BROWSER-ES5" || TARGET="BROWSER-ES6" **
/* exported CotFormView */
/* @endif */
/* @if TARGET="BROWSER-ES6-MODULE" */
export default CotFormView;
/* @endif */
