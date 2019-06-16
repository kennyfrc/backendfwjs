var _ = require('underscore');

// routing class
function Router() {
  // declare where to store the routes
  this.routes = {};
}
// module is a variable that represents current module and 
// exports is an object that will be exposed as a module.
// So, whatever you assign to module.exports or exports, 
// will be exposed as a module.
module.exports.Router = Router

// routes is an object that contains a route object or an empty array
// add a Router to the Router that is an object that 
// contains regexp and the callback function

Router.prototype.route = function(method, url, callback) {
  // we need to intiialize it if it doesn't exist yet
  // if it exists, then pass itself. if not, pass an empty array
  // if a route method doesn't exist, then 
  // pass the empty array then asisgn it to both
  // this.routes[method] and the routes var
  var routes = this.routes[method] = this.routes[method] || [];

  // create a new route to that array
  routes.push({
  	regexp: new RegExp("^" + url + "$", "i")
  	callback: callback
  })
}

// retrieve all the available routes for the methd
// filter through the routes until we see something that matches the url
// -> use underscore to find the route
// -> if a route matches, then we invoke the callback, which passes
// -> the request and reponse

Router.prototype.handle = function(req, res) {
	var routes = this.routes[req.method],
		// find the route that's assigned to the rul
		route = _.find(routes, function(route){
			return route.regexp.test(req.url)
		})

	if (route) {
		route.callback(req, res)
	}
}