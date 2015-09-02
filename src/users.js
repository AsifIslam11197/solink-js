'use strict';

var querystring = require('querystring');
var URL = require('url');
var sendRequest = require('./common/send-request');

var usersUrl = function(host) {
  return URL.resolve(host, 'users/');
};

var _create = function(user) {
  var url = usersUrl(this.host);
  var options = {
    method: 'POST',
    headers: { 'content-type': 'application/json'},
    body: JSON.stringify(user),
  };

  return sendRequest(this, url, options);
};

var _find = function(params) {
  var url = usersUrl(this.host);
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

var _delete = function(id) {
  var url = URL.resolve(usersUrl(this.host), id);
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
    delete: _delete.bind(connection),
  };
};
