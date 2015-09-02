function Connection(params, host, root) {
  if (params.hasOwnProperty('auth_token') && params.hasOwnProperty('aws')) {
    this.token = params;
  } else if (params.hasOwnProperty('email') && params.hasOwnProperty('password')) {
    this.credentials = params;
    this.token = {};
  }

  this.host = host || 'https://api.solinkcloud.com';
  this.root = root;
  this.tenantId = '';
}

function SolinkAPI(params, host) {
  var connection = new Connection(params, host, this);
  this.auth = require('./src/auth')(connection);
  this.filters = require('./src/filters')(connection);
  this.events = require('./src/events')(connection);
  this.users = require('./src/users')(connection);
  this.locations = require('./src/locations')(connection);
  this.images = require('./src/images')(connection);
}

module.exports = SolinkAPI;
