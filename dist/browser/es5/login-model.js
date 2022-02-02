"use strict";

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
    var _this = this;

    if (!this.isNew()) {
      return this.verify();
    }

    return new Promise(function (resolve, reject) {
      _this.save(null, {
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function (data) {
        _this.setLastVerified(new Date());

        resolve(data);
      }, function (jqXHR, textStatus, errorThrown) {
        reject(errorThrown);
      });
    });
  },
  logout: function logout() {
    var _this2 = this;

    if (this.isNew()) {
      return Promise.resolve();
    }

    return new Promise(function (resolve) {
      _this2.destroy({
        headers: {
          'Authorization': _this2.attributes.userID
        }
      }).then(function () {
        _this2.reset();

        _this2.setLastVerified(null);

        resolve();
      }, function () {
        resolve();
      });
    });
  },
  verify: function verify() {
    var _this3 = this;

    if (this.isNew()) {
      return Promise.reject();
    }

    return new Promise(function (resolve, reject) {
      _this3.fetch({
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function (data) {
        _this3.setLastVerified(new Date());

        resolve(data);
      }, function (jqXHR, textStatus, errorThrown) {
        return _this3.logout().then(function () {
          reject(errorThrown);
        });
      });
    });
  },
  lastVerified: null,
  preTimeout: null,
  preTimeoutDelay: 1770000,
  // (30 * 60 * 1000) - (10 * 1000) = 1770000
  timeout: null,
  timeoutDelay: 1800000,
  // 30 * 60 * 1000 = 1800000
  setLastVerified: function setLastVerified(date) {
    var _this4 = this;

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
      this.preTimeout = setTimeout(function () {
        return void _this4.trigger('pretimeout');
      }, this.preTimeoutDelay);
      this.timeout = setTimeout(function () {
        return void _this4.trigger('timeout');
      }, this.timeoutDelay);
    } else {
      this.lastVerified = null;
    }
  }
});
/* exported LoginModel */