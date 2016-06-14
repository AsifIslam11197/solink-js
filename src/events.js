'use strict';

var querystring = require('querystring');
var URL = require('url');
var sendRequest = require('./common/send-request');

var eventsUrl = function(host) {
  return URL.resolve(host, 'events/');
};

var _find = function(params) {
  var url = eventsUrl(this.host);
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

var _create = function(ev) {
  var url = eventsUrl(this.host);
  var options = {
    method: 'POST',
    headers: { 'content-type': 'application/json'},
    body: JSON.stringify(ev),
  };

  return sendRequest(this, url, options, true)
    .then(function(res) {
      var buffer = new Buffer(res.body._readableState.buffer[0]);
      return JSON.parse(buffer.toString('utf-8'));
    });
};

var _editEvent = function(id, body) {
  var url = URL.resolve(eventsUrl(this.host) + id + '/', 'edit');
  var options = {
    method: 'PUT',
    headers: { 'content-type': 'application/json'},
    body: JSON.stringify(body),
  };
  return sendRequest(this, url, options);
};

var _histogram = function(params) {
  var url = URL.resolve(eventsUrl(this.host), 'histogram');
  var options = {
    method: 'GET',
    headers: { 'content-type': 'application/json'},
  };

  url = URL.resolve(url, '?' + querystring.stringify(params));

  return sendRequest(this, url, options);
};

module.exports = function(connection) {
  return {
    find: _find.bind(connection),
    create: _create.bind(connection),
    editEvent: _editEvent.bind(connection),
    histogram: _histogram.bind(connection),
  };
};
