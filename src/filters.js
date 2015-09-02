'use strict';
var querystring = require('querystring');
var URL = require('url');
var sendRequest = require('./common/send-request');

var filtersUrl = function(host) {
  return URL.resolve(host, 'filters/');
};

var _create = function(filter) {
  var url = filtersUrl(this.host);
  var options = {
    method: 'POST',
    headers: { 'content-type': 'application/json'},
    body: JSON.stringify(filter),
  };

  return sendRequest(this, url, options);
};

var _find = function(params) {
  var url = filtersUrl(this.host);
  var options = {
    method: 'GET',
    headers: { 'content-type': 'application/json'},
  };

  if (typeof params === 'string') {
    url = URL.resolve(url, params);
  } else {
    url = URL.resolve(url, '?' + querystring.stringify(params));
  }

  return sendRequest(this, url, options);
};

var _update = function(id, filter) {
  var url = URL.resolve(filtersUrl(this.host), id);
  var options = {
    method: 'PUT',
    headers: { 'content-type': 'application/json'},
    body: JSON.stringify(filter),
  };

  return sendRequest(this, url, options);
};

var _delete = function(id) {
  var url = URL.resolve(filtersUrl(this.host), id);
  var options = {
    method: 'delete',
    headers: {},
  };

  return sendRequest(this, url, options, true);
};

module.exports = function(connection) {
  return {
    create: _create.bind(connection),
    find: _find.bind(connection),
    update: _update.bind(connection),
    delete: _delete.bind(connection),
  };
};
