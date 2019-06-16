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

Router.prototype.route = function(method, url, calblack) {
  // we need to intiialize it if it doesn't exist yet
  // if it exists, then pass itself. if not, pass an empty array
  var routes = this.routes[method] = this.routes[method] || [];

  // create a new route to that array
  routes.push({
  	regexp: new RegExp("^" + url + "$", "i"),
  	callback: callback
  })
}