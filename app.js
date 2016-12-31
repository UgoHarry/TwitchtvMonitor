var express = require ('express');
var app = express();

//SERVE STATIC FILES FROM SPECIFIED FOLDERS
app.use(express.static('dist'));
app.use('/bower_components', express.static(__dirname+'/bower_components'));

//ROUTING. IMPORTANT: TO SERVE PRODUCTION FILE, CHANGE PATH FROM 'app/...' TO 'dist/...'
app.get('/', function(req,res) {
  res.sendFile(__dirname+'/dist/index.html');
});

//LAUNCH SERVER AND LISTEN ON PORT
app.listen(3000, function() {
  console.log("App is running and listening on port 3000");
});
