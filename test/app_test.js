var assert = require('assert'),
    App = require('../lib/app').App,
    Response = require('../lib/response').Response

describe('App', function() {
  beforeEach(function() {
    this.app = new App()
  })

  it('handle GET', function() {
    var called
    
    this.app.get('/', function() { called = true })
    
    this.app.handle({ method: 'GET', url: '/' }, {})
    
    assert(called)
  })

  it('res has send method', function() {
    var res
    
    this.app.get('/', function(_req, _res) { res = _res })
    
    this.app.handle({ method: 'GET', url: '/' }, {})
    
    assert(res.send)
  })

  it('error is caught', function () {
    var err = new Error('Ouch')
    err.status = 500

    this.app.get('/', function() { throw err })

    var status, body
    this.app.handle({ method: 'GET', url: '/' },
                    { // Response object (res)
                      send: function(_status, _body) {
                        status = _status
                        body = _body
                      }
                    })

    assert.equal(status, err.status)
    assert.equal(body, err.message)
  })

  it('call middlewares', function() {
    var called
    
    this.app.use(function(req, res, next) { next() })
    this.app.use(function() { called = true })

    this.app.handle({ method: 'GET', url: '/' }, {})
    
    assert(called)
  })
  
  it('router is a middleware', function() {
    this.app.use(this.app.router)
    this.app.get('/', function(req, res) { req.called = true })
    
    var routerWasCalledFirst
    this.app.use(function(req, res, next) { routerWasCalledFirst = req.called })

    this.app.handle({ method: 'GET', url: '/' }, {})
    
    assert(routerWasCalledFirst)
  })
})