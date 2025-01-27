var assert = require('assert'),
    Router = require('../lib/router').Router

describe('Router', function() {
  // beforeEach is executed before each test
  beforeEach(function() {
    this.router = new Router()
  })

  it('stores routes', function () {
    var callback = function() {}
    // callback triggers once that route matches
    // makes sure that we store the routes inside the router
    // we make sure of that by declaring the routes using
    // the ROUTE METHOD (such as get), the URL, then the 
    // callback called when the route matches
    this.router.route('GET', '/', callback)
    this.router.route('POST', '/login', callback)
    
    assert.deepEqual(this.router.routes, {
      // store the routes in a tree-like structure
      // starts with the METHOD (GET, POST). nested under that
      // is an ARRAY
      // containing one object for each one of the routes
      // one is the regex for matching that url
      GET: [
        {
          // regular expression for matching that url
          regexp: new RegExp("^/$", "i"),
          // the js function to be called once it matches
          callback: callback          
        }
      ],
      POST: [
        {
          regexp: new RegExp("^/login$", "i"),
          callback: callback          
        }
      ]
    })
  })

  it('handle GET', function() {
    var called
    
    this.router.route('GET', '/hi', function() { called = true })
    
    this.router.handle({ method: 'GET', url: '/hi' }, {})
    
    assert(called, "Should call get route")
  })
  
  it('handle POST', function() {
    var getCalled, postCalled

    this.router.route('GET', '/',  function() { getCalled = true })
    this.router.route('POST', '/', function() { postCalled = true })
    
    this.router.handle({ method: 'POST', url: '/' }, {})

    assert(!getCalled, "Shouldn't call post route")
    assert(postCalled, "Should call post route")
  })
  
  it('handle not found', function() {
    var self = this

    assert.throws(function() {
      self.router.handle({ method: 'GET', url: '/' }, {})
    }, function(err) {
      return err.status == 404
    }, "Should throw 404 error")
  })
})