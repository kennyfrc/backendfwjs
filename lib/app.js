// store the requests into the router
// require the router
// define the app class, make sure you have an instance of the router
// define the get method which will define / store the router
// delegate it to the route 
// delegate the handle function
// metaprogramming to handle all methods

var Router = require('./router').Router,
    Response = require('./response').Response
    http = require('http')
    cons = require('consolidate')

function App() {
  this.router = new Router();
  this.settings = {}
  this.middlewares = []
}

module.exports.App = App;

App.prototype.get = function(url, callback) {
  this.router.route("GET", url, callback);
}

App.prototype.post = function(url, callback) {
  this.router.route("POST", url, callback);
}

App.prototype.update = function(url, callback) {
  this.router.route("UPDATE", url, callback);
}

App.prototype.delete = function(url, callback) {
  this.router.route("DELETE", url, callback);
}

App.prototype.use = function(middleware) {
  this.middlewares.push(middleware);
}

App.prototype.handle = function(req, res) {
  // res gets access to Response's prototype chaing
  // we also want the original Object because it 
  // already holds some data from the server
  res.__proto__ = Response.prototype;
  res.app = this;

  var self = this,
      index = 0

  function next() {
    // everytime we're inside a callback function,
    // always replace this with self
    var middleware = self.middlewares[index++]

    try {
      if (middleware) {
        middleware(req, res, next)
      } else {
        self.router.handle(req, res);  
      }
    } catch(e) {
      if (e.status) {
        res.send(e.status, e.message)
      } else {
        throw e
      }
    }
  }
  // to make sure that this gets called once handle 
  // is invoked
  next() 
  // if there's no error, just run as usual
  // if tehre's ae status code, then send
  // the status message
  // else, just throw the error
}

App.prototype.listen = function(port) {
  var self = this;

  var server = http.createServer(function (req, res) {
    self.handle(req, res);
  })

  server.listen(port);

}

App.prototype.set = function(name, value) {
  this.settings[name] = value;
}

App.prototype.render = function(template, locals, callback) {
  var engineName = this.settings['view engine']
  var path = this.settings['views'] + '/' + template + '.' + engineName

  cons[engineName](path, locals, function(err, html) {
    if (err) throw err
    callback(html)
  })

}
