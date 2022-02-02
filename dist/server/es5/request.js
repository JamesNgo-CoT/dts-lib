"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function getHeaders(request) {
  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  headers = Object.assign({
    'Accept': 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8'
  }, headers);
  var authorization = request.getHeader('Authorization');

  if (authorization) {
    headers['Authorization'] = authorization;
  }

  return headers;
}

function getEntityUrl(request, entity, id, queries) {
  var url = "".concat(request.getRawBaseUri(), "/").concat(entity);

  if (id) {
    url = "".concat(url, "('").concat(encodeURIComponent(id), "')");
  }

  if (queries) {
    if (_typeof(queries) === 'object') {
      if (!Array.isArray(queries)) {
        var temp = [];

        for (var key in queries) {
          temp.push("".concat(key, "=").concat(encodeURIComponent(queries[key])));
        }

        queries = temp;
      }

      queries = queries.join('&');
    }

    url = "".concat(url, "?").concat(queries);
  }

  return url;
}

function getEntitySetUrl(request, entity, queries) {
  return getEntityUrl(request, entity, null, queries);
}

module.exports = {
  getHeaders: getHeaders,
  getEntityUrl: getEntityUrl,
  getEntitySetUrl: getEntitySetUrl
};