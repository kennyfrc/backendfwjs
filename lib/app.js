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

function App() {
  this.router = new Router();
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

App.prototype.handle = function(req, res) {
  // res gets access to Response's prototype chaing
  // we also want the original Object because it 
  // already holds some data from the server
  res.__proto__ = Response.prototype;

  // res.__proto__ = Response.prototype

  // if there's no error, just run as usual
  // if tehre's ae status code, then send
  // the status message
  // else, just throw the error
  try {
    this.router.handle(req, res);
  } catch(e) {
    if (e.status) {
      res.send(e.status, e.message)
    } else {
      throw e
    }
  }
}

App.prototype.listen = function(port) {
  var self = this;

  var server = http.createServer(function (req, res) {
    self.handle(req, res);
  })

  server.listen(port);

}