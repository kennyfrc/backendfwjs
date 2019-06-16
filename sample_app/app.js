// Below is a more basic implementation

var shazam = require('../lib/shazam');

var app = shazam();

app.get('/', function(req, res) {
  res.send("It's alive!")
})

app.listen(3000)


// // Below is the router that renders the view tempaltes

// var instant = require('../lib/instant'),
//     logger = require('morgan'),
//     serveStatic = require('serve-static')

// var app = instant()

// app.set('views', __dirname + '/views')
// app.set('view engine', 'jade')

// app.use(logger())
// app.use(serveStatic(__dirname + '/public'))

// app.get('/', function(req, res) {
//   res.render('index', { title: 'Instant' })
// })

// app.listen(3000)