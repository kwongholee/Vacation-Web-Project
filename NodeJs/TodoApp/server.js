const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

var db; //자료를 저장할 변수 필요

MongoClient.connect('mongodb+srv://leekwongho:albert9883@nodejspractice.ax8x1qt.mongodb.net/?retryWrites=true&w=majority', function(err, client) {
  if(err) return console.log(err);

  db = client.db('todoapp'); //todoapp 이라는 database에 연결

  app.listen(8080, function(req, res) {
    console.log('listening on 8080');
  })
})

app.get('/beauty', function(req, res) {
  res.send('Beauty Site');
});

app.get('/pet', function(req, res) {
  res.send('Pet Site');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/html/index.html');
});

app.get('/write', function(req, res) {
  res.sendFile(__dirname+'/html/write.html');
});

app.post('/add', function(req,res) {
  db.collection('post').insertOne({title: req.body.title, date: req.body.date}, function(err, res) {
    console.log('Write Save');
  })
  res.send('Good Job');
});

app.get('/list', function(req, res) {
  res.render('list.ejs');
})