"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function setResponse(response, code, content) {
  response.setStatusCode(code);

  if (_typeof(content) === 'object') {
    content = JSON.stringify(content);
  }

  response.setContent(content);
}

module.exports = {
  setResponse: setResponse
};