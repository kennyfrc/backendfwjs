// consolidate the APIs of the different template engines
var cons = require('consolidate')
// ..  __dirname is always the directory in which the
// currently executing script resides
// . gives you the directory from which you ran the node
// command in your terminal window (i.e. your working directory)
// when you use libraries like path and fs
var path = __dirname + "/../sample_app/views/index.jade"
    locals = { title: 'Demo' }

cons.jade(path, locals, function(err, html) {
  if (err) throw err
  console.log(html)
})