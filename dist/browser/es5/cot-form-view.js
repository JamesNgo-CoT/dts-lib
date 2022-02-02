"use strict";

/* global $ _ CotForm */

/* global View */
var CotFormView = View.extend({
  $liveRegion: null,
  initialize: function initialize() {
    var _View$prototype$initi;

    this.$liveRegion = $('.js-aria-live.sr-only, .ui-helper-hidden-accessible').first();

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_View$prototype$initi = View.prototype.initialize).call.apply(_View$prototype$initi, [this].concat(args));
  },
  formId: null,
  rootPath: null,
  sections: null,
  success: function success(event) {
    event.preventDefault();
    this.removeErrorMessage();
    this.trigger('success');
    return false;
  },
  title: null,
  definition: function definition() {
    var _this = this;

    var formId = _.result(this, 'formId');

    var id = _.result(this, 'id');

    return {
      id: formId ? formId : id ? "".concat(id, "Form") : null,
      rootPath: _.result(this, 'rootPath'),
      sections: _.result(this, 'sections'),
      success: function success(event) {
        return _this.success(event);
      },
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
  render: function render() {
    var _this2 = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$setFocus = _ref.setFocus,
        setFocus = _ref$setFocus === void 0 ? false : _ref$setFocus;

    this.$el.empty();
    var definition = Object.assign({}, _.result(this, 'definition', {}));

    var loopDefinition = function loopDefinition(callback) {
      if (definition.sections) {
        var sections = definition.sections;

        for (var sIndex = 0, sLength = sections.length; sIndex < sLength; sIndex++) {
          var section = sections[sIndex];
          callback('section', section);

          if (section.rows) {
            var rows = section.rows;

            for (var rIndex = 0, rLength = rows.length; rIndex < rLength; rIndex++) {
              var row = rows[rIndex];
              callback('row', row); // FIELDS

              if (row.fields) {
                var fields = row.fields;

                for (var fIndex = 0, fLength = fields.length; fIndex < fLength; fIndex++) {
                  var field = fields[fIndex];
                  callback('field', field);
                }

                continue;
              } // GRID


              if (row.grid) {
                var grid = row.grid;
                callback('grid', grid);

                if (grid.fields) {
                  var _fields = grid.fields;

                  for (var _fIndex = 0, _fLength = _fields.length; _fIndex < _fLength; _fIndex++) {
                    var _field = _fields[_fIndex];
                    callback('gridField', _field);
                  }
                }

                continue;
              } // REPEAT CONTROL


              if (row.repeatControl) {
                var repeatControl = row.repeatControl;
                callback('repeatControl', repeatControl);

                if (repeatControl.rows) {
                  var _rows = repeatControl.rows;

                  for (var _rIndex = 0, _rLength = _rows.length; _rIndex < _rLength; _rIndex++) {
                    var _row = _rows[_rIndex];
                    callback('repeatControlRow', _row);

                    if (_row.fields) {
                      var _fields2 = _row.fields;

                      for (var _fIndex2 = 0, _fLength2 = _fields2.length; _fIndex2 < _fLength2; _fIndex2++) {
                        var _field2 = _fields2[_fIndex2];
                        callback('repeatControlField', _field2);
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

    loopDefinition(function (type, definition) {
      switch (type) {
        case 'field':
        case 'gridField':
        case 'repeatControlField':
          {
            for (var key in definition) {
              if (key !== 'onclick' && key !== 'preRender' && key !== 'postRender') {
                definition[key] = _.result(definition, key);
              }
            }

            if (_this2.model && definition.bindTo && definition.choices) {
              if (_this2.model.has(definition.bindTo)) {
                var values = Array.isArray(_this2.model.attributes[definition.bindTo]) ? _this2.model.attributes[definition.bindTo] : [_this2.model.attributes[definition.bindTo]];
                var choices = definition.choices.map(function (_ref2) {
                  var text = _ref2.text,
                      value = _ref2.value;
                  return value || text;
                });

                for (var index = values.length - 1; index >= 0; index--) {
                  var value = values[index];

                  if (choices.indexOf(value) === -1) {
                    definition.choices.unshift({
                      text: value
                    });
                  }
                }
              }
            }

            break;
          }
      }

      if (definition.preRender) {
        definition.preRender.call(_this2, definition, _this2);
      }
    });
    var cotForm = new CotForm(definition);
    cotForm.render({
      target: this.$el
    });

    if (this.model) {
      cotForm.setModel(this.model);
    }

    this.$form = $('form', this.$el).first();
    this.formValidator = this.$form.data('formValidation');
    this.$alert = $('<div role="alert"></div>');
    $('.panel:first', this.$form).before(this.$alert);
    this.$form.append(_.result(this, 'footer', ''));
    loopDefinition(function (type, definition) {
      if (definition.postRender) {
        definition.postRender.call(_this2, definition, _this2);
      }
    });

    if (this.postRender) {
      this.postRender.call(this, definition, this);
    }

    var $title = $('h2', this.$form).attr('tabindex', '-1').first();

    if (setFocus) {
      $title.focus();
    }

    return this;
  },
  disabledElements: null,
  disableFields: function disableFields() {
    this.$disabledElements = this.$form.find('button, input, select, textarea').filter(':enabled:visible').prop('disabled', true);
    this.$liveRegion.html('Form fields are disabled');
    return this;
  },
  enableFields: function enableFields() {
    if (this.$disabledElements) {
      this.$disabledElements.prop('disabled', false);
      this.$disabledElements = null;
    }

    this.$liveRegion.html('Form fields are enabled');
    return this;
  },
  setErrorMessage: function setErrorMessage(message) {
    var _this3 = this;

    // Dont know why, but this doesn't work unless it's inside a set timeout.
    setTimeout(function () {
      return void _this3.formValidator.resetForm(false);
    }, 0);
    this.$alert.addClass('alert alert-danger');
    this.$alert.html(message);
    return this;
  },
  removeErrorMessage: function removeErrorMessage() {
    this.$alert.removeClass('alert alert-danger');
    this.$alert.html('');
    return this;
  }
});
/* exported CotFormView */