var http = require('http')

// Our own Response class.
// We make `res` inherit from this to add our own helper methods.
function Response() {}

// inherit from server response
Response.prototype = Object.create(http.ServerResponse.prototype)
Response.prototype.constructor = Response
exports.Response = Response

// Default Content-Type to HTML.
Response.prototype.contentType = 'text/html'

// Helper to send a response.
// Usage:
//   res.send('body')
//   res.send(404, 'Not found')

// this just combines both the sending and completion
// of sending the response. it's just a wrapper
Response.prototype.send = function(status, body) {
  if (body == null) {
    body = status
    status = 200
  }
  // send 
  this.writeHead(status, {
    'Content-Length': body.length,
    'Content-Type': this.contentType
  })
  // complete the response
  this.end(body)
}

Response.prototype.render = function(file, locals) {
  var self = this

  this.app.render(file, locals, function(html) {
    self.send(html)
  })
}