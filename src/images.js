'use strict'
var AWS = require('aws-sdk/dist/aws-sdk')

var _get = function(imgPath) {
  if (Object.keys(this.token).length === 0)
    login = this.root.auth.login()
  else 
    login = Promise.resolve()

  var self = this
  return login.then(function() {
    var s3 = new AWS.S3(self.token.aws);
    var img_url = s3.getSignedUrl('getObject', {
      Bucket: "solinkimages",
      Key:    self.tenantId + '/' + imgPath 
    });
    return img_url
  })
}

module.exports = function(connection) {
  return {
    get: _get.bind(connection)
  }
}