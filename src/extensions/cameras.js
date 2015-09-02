'use strict';

var querystring = require('querystring');
var URL = require('url');
var sendRequest = require('../common/send-request');

var locationsUrl = function(host) {
  return URL.resolve(host, 'locations/');
};

var _at = function(params, nvrId) {
  var url = locationsUrl(this.host);
  var options = {
    method: 'GET',
    headers: { 'content-type': 'application/json'},
  };

  url = URL.resolve(url, nvrId + '/cameras/');

  if (typeof params === 'string') {
    url = URL.resolve(url, params);
  } else {
    url = URL.resolve(url, '?' + querystring.stringify(params));
  }

  return sendRequest(this, url, options);
};

module.exports = function(connection, params) {
  return {
    at: _at.bind(connection, params),
  };
};
