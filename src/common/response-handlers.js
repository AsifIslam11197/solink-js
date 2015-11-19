var _checkStatus = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {

    var error = new Error(response.statusText);
    
    error.statusCode = response.status;
    return response.json().then(function(msg) {
      error.body = msg;
      return Promise.reject(error);
    }, function(err) {
      return Promise.reject(error);
    });
  }
};

var _parseJSON = function(response, skip) {
  if (skip) {
    return response;
  }

  return response.json();
};

module.exports = {
  checkStatus: _checkStatus,
  parseJSON: _parseJSON,
};
