"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/* global __context Java Packages */
var JsonArray = Java.type('com.google.gson.JsonArray');
var JsonObject = Java.type('com.google.gson.JsonObject');
var JsonNull = Java.type('com.google.gson.JsonNull');

function toJsonArray(value) {
  var jsonArray = new JsonArray();

  for (var index = 0, length = value.length; index < length; index++) {
    var item = value[index];

    if (_typeof(item) === 'object') {
      jsonArray.add(toJsonElement(item));
    } else {
      jsonArray.add(item);
    }
  }

  return jsonArray;
}

function toJsonObject(value) {
  var jsonObject = new JsonObject();

  for (var key in value) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) {
      continue;
    }

    var item = value[key];

    if (_typeof(item) === 'object') {
      jsonObject.add(key, toJsonElement(item));
    } else {
      jsonObject.addProperty(key, item);
    }
  }

  return jsonObject;
}

function toJsonElement(value) {
  if (value == null) {
    return new JsonNull();
  }

  if (Array.isArray(value)) {
    return toJsonArray(value);
  }

  return toJsonObject(value);
}

function wrap(content, request) {
  var wrapper = {
    content: content,
    json: JSON.parse(content.toString()),
    get: function get(property) {
      return this.json[property];
    },
    set: function set(property, value) {
      var json;

      if (typeof property === 'string') {
        json = {};
        json[property] = value;
      } else {
        json = property;
      }

      for (var key in json) {
        var item = json[key];

        if (this.json[key] === item) {
          continue;
        }

        if (this.json[key] !== undefined) {
          if (this.content.has(key)) {
            this.content.remove(key);
          }

          if (item === undefined) {
            delete this.json[key];
          }
        }

        if (item !== undefined) {
          this.json[key] = item;

          if (_typeof(item) === 'object') {
            this.content.add(key, toJsonElement(item));
          } else {
            this.content.addProperty(key, item);
          }
        }
      }

      return this;
    },
    unset: function unset(key) {
      return this.set(key);
    }
  };
  var now = new Date().toISOString();

  var userId = __context.get(Packages.ca.toronto.api.dataaccess.odata4.DataAccessContext.Constant.USER_ID);

  if (userId) {
    if (request.getMethod() === 'POST') {
      this.set('CreatedBy', userId);
      this.set('CreatedOn', now);
    }

    this.set('ModifiedBy', userId);
  } else {
    this.unset('ModifiedBy');
  }

  this.set('ModifiedOn', now);
  return wrapper;
}

module.exports = {
  toJsonArray: toJsonArray,
  toJsonObject: toJsonObject,
  toJsonElement: toJsonElement,
  wrap: wrap
};