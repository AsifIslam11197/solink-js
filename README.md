# Solink API client
Node npm module to serve as an intermediary client for all calls to the Solink API

### Installation
```Bash
npm install solink-js --save
```

### Instantiation
```JavaScript
var SolinkAPI = require('solink-js'),
    url = 'http://localhost:8800' || 'https://api.solinkcloud.com',
    token = {
        "auth_token": "thisisthetoken",
          "aws": {
            "accessKeyId": "ACCESSKEYID",
            "secretAccessKey": "secret/Acce/ssKey",
            "sessionToken": "session+Token"
          }
        },
    credentials = { 
      'email' : 'irfanisawesome@email.com', 
      'password' : 'password'
    }

// URL defaults to cloud url
var api = new SolinkAPI(credentials[, url]) || new SolinkAPI(token[, url])
```

#### Usage
General usage:

```JavaScript
api.endpoint.action(params)
    .then(function(res) {
        console.log('worked!')
    }, function(err) {
        console.log(err.statusCode)
    })
```

Supported endpoints & actions:

```JavaScript
auth.
    login({email: 'email@email.com', password: 'password'})
    setPassword({email: 'email@email.com', password: 'password'})
    forgotPassword({email: 'email@email.com', newPassword: 'newPassword'})
    refresh(refreshToken, jwtToken)
   
events.
    find('event_id')
    find({offset: 1, count: 10, start: '1995-24-12T12:30:00'})
    create(ev) // event object
    histogram({date: '1995-24-12T12:30:00', range: 'day'})
    
filters.
    create(filter) // filter object
    find('filter_id')
    find({offset: 1, count: 3})
    update('filter_id', ufilter) // updated filter object
    delete('filter_id')
    
users.
    create(user) // user object
    find('user_id')
    find({offset: 1, count: 3})
    delete('id')
    
locations.
    find() // list nvr locations
    find(nvr_id) //locations/nvr_id
    tree(orgPath, depth) // orgpath format: 'Canada/Ontario/Kanata', depth: int
    cameras(camera_id).at(nvr_id)
    cameras({offset: 0, count: 1}).at(nvr_id)

images.
  get('image_path.png') // fetches image url in S3 bucket
```

Each function defined above returns a promise, error-handling is left upto the user, functions can therefore be chained/nested:

```JavaScript
api.filters.create(filter)
  .then(function(res) {   console.log('created')  })
  .then(function() {
    api.filters.find(filter.id)
      .then(function(res) {   console.log('found')    })
      .then(function() {
        api.filters.update(filter.id, filter)
          .then(function(res) {   console.log('updated')  })
          .then(function() {
            api.filters.delete(filter.id)
              .then(function() {  console.log('deleted')  })
          })
      })
  })
```

Each promise will propogate any error if thrown from the platform. This can be caught and addressed as follows:

```JavaScript
api.users.create(user)
    .then(function(res) {  } )
    .catch(function(err) { console.log('err, do something') } )
```