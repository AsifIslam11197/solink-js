'use strict'

var querystring = require('querystring'),
  URL = require('url'),
  sendRequest = require('../common/send-request')

var locationsUrl = function(host) {
  return URL.resolve(host, 'locations/')
}

var _at = function(params, nvr_id) {
  var url = locationsUrl(this.host),
  options = {
    method: 'GET',
    headers: { 'content-type': 'application/json'},
  };

  url = URL.resolve(url, nvr_id + '/cameras/');

  if (typeof params === 'string') {
    url = URL.resolve(url, params)
  } else {
    url = URL.resolve(url, '?' + querystring.stringify(params));
  }
  
  return sendRequest(this, url, options)
};

module.exports = function(connection, params) {
  return {
    at: _at.bind(connection, params)
  };
};
