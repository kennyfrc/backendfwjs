// Below is a more basic implementation

// var shazam = require('../lib/shazam');

// var app = shazam();

// app.get('/', function(req, res) {
//   res.send("It's alive!")
// })

// app.listen(3000) 



// this tests out the view templates

var shazam = require('../lib/shazam')

var app = shazam()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.get('/', function(req, res) {
  res.render('index', { title: 'shazam' })
})

app.listen(3000)



//     logger = require('morgan'),
//     serveStatic = require('serve-static')

// app.use(logger())
// app.use(serveStatic(__dirname + '/public'))