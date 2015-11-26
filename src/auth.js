'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

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

var _forgotPassword = function (credentials) {
  var url = URL.resolve(authUrl(this.host), 'forgotpassword'),
    options = { 
      method: 'POST', 
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(credentials)
    }

  return fetch(url, options)
    .then(helper.checkStatus)
    .then(helper.parseJSON)
}

var _refresh = function(refreshToken, jwtToken) {
  var url = URL.resolve(authUrl(this.host), 'refresh');
  var options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      token: refreshToken,
      authToken: jwtToken
    })
  };

  var _this = this;
  return fetch(url, options)
    .then(helper.checkStatus)
    .then(helper.parseJSON);
}

var _switchUser = function (userToken) {
  var _this = this;
  _this.token = userToken;
  _this.tenantId = jwtDecode(userToken.authToken).app_metadata.tenantId;
}

module.exports = function(connection) {
  return {
    login: _login.bind(connection),
    setPassword: _setPassword.bind(connection),
    forgotPassword: _forgotPassword.bind(connection),
    refresh: _refresh.bind(connection),
    switchUser: _switchUser.bind(connection)
  }
}