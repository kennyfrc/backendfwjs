# Backend Framework JS (Shazam)

## TODO:

We implement a `Router` class with a `route(method, url, callback(req, res))` method for defining routes.

The router routes the requests via its handle(req, res) method.

If a route is not found, an error is raised.

We wrap the router in an App to expose a nicer API.

We make res, the response object, inherit from our own Response class.

This allow us to add our own methods to res. Like res.send([status,] body).

We wrap the App creation in a nice instant() function.
