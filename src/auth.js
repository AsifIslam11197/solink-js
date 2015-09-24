'use strict';

var URL = require('url');
var jwtDecode = require('jwt-decode');
var helper = require('./common/response-handlers');

var authUrl = function(host) {
  return URL.resolve(host, 'auth/');
};

var _login = function(credentials) {
  this.credentials = credentials || this.credentials;
  var url = URL.resolve(authUrl(this.host), 'login');
  var options = {
    method: 'POST',
    headers: { 'content-type': 'application/json'},
    body: JSON.stringify(this.credentials),
  };

  var _this = this;
  return fetch(url, options)
    .then(helper.checkStatus)
    .then(helper.parseJSON)
    .then(function(json) {
      _this.token = json;
      _this.tenantId = jwtDecode(json.authToken).app_metadata.tenantId;
      return json;
    });
};

var _setPassword = function(credentials) {
  var url = URL.resolve(authUrl(this.host), 'setpassword');
  var options = {
      method: 'PUT',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(credentials),
    };

  return fetch(url, options)
    .then(helper.checkStatus)
    .then(helper.parseJSON);
};

var _refresh = function(refreshToken) {
  var url = URL.resolve(authUrl(this.host), 'refresh');
  var options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({token: refreshToken})
  };

  var _this = this;
  return fetch(url, options)
    .then(helper.checkStatus)
    .then(helper.parseJSON)
    .then(function (json) {
      return json;
    });
}

module.exports = function(connection) {
  return {
    login: _login.bind(connection),
    setPassword: _setPassword.bind(connection),
    refresh: _refresh.bind(connection)
  };
};
