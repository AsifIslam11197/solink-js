'use strict';

// var AWS = require('aws-sdk/dist/browser')

var _get = function(imgPath) {
  if (Object.keys(this.token).length === 0) {
    login = this.root.auth.login();
  }else {
    login = Promise.resolve();
  }

  var _this = this;
  return login.then(function() {
    var s3 = new AWS.S3(self.token.aws);
    var imgUrl = s3.getSignedUrl('getObject', {
      Bucket: 'solinkimages',
      Key:    self.tenantId + '/' + imgPath,
    });
    return imgUrl;
  });
};

module.exports = function(connection) {
  return {
    get: _get.bind(connection),
  };
};
