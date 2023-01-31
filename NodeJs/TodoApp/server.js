const express = require('express');
const app = express();

app.listen(8080, function(req, res) {
  console.log('listening on 8080');
});

app.get('/beauty', function(req, res) {
  res.send('Beauty Site');
});

app.get('/pet', function(req, res) {
  res.send('Pet Site');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});