'use strict';

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/index.html', function(request, response) {
 response.sendFile('index.html', {root: './public'});
 })

app.get('/new.html', function(request, response) {
  response.sendFile('index.html', {root: './public'});
 });

app.listen(PORT, function() {
   console.log('server is up and running on port 3000 and can be accessed at localhost:3000 in your browser');
  })
