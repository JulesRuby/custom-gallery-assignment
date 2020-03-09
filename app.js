// Establish required node package modules
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const moment = require('moment');

// Establish my personal modules
const pageAttributes = require('./pageAttributes')

// Establish variables 
// assign a striong to dateYear to pass as an argument into the format() of the moment()
const dateYear = "YYYY";

const app = express();

// make these accessible throughout my ejs 
app.locals.moment = require('moment');
app.locals.dateYear = dateYear;

// Define the 'view engine' that we'll be using. In this case it will be ejs, but it could be something like pug or handlebars
app.set('view engine', 'ejs');

// Retrieve information from pageAttributes to render and use template varibles throughout the website
app.get('/', function(req, res) {
  res.render('index', pageAttributes.index);
});

app.get('/about', function(req, res) {
  res.render('about', pageAttributes.about);
});

app.get('/gallery', function(req, res) {
  res.render('gallery', pageAttributes.gallery);
});

app.get('/blog', function(req, res) {
  res.render('blog', pageAttributes.blog);
});


app.use(express.static(path.join(__dirname, 'public'))); 
// read more on how this mechanism operates, I only kind of get it
// NOTE TO SELF: the path.join will result in an implicit next() if the specified directory is not found

app.use(function(req,res,next) {
  res.status(404);
  res.send(`404 not found, maybe I specified the wrong directory, or it doesn't exist... yet?`);
});


// PORT defaults to 3000 unless a different one is specified
const PORT = process.env.PORT || 3000; 

app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});
