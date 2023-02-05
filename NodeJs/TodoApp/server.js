const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use('../public', express.static('public'));

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
  res.render('index.ejs');
});

app.get('/write', function(req, res) {
  res.render('write.ejs');
});

app.post('/add', function(req,res) {
  db.collection('counter').findOne({name: 'postCount'}, function(err, result) {
    var totalPost = result.totalPost;
    db.collection('post').insertOne({_id: totalPost+1, title: req.body.title, date: req.body.date}, function(err, res) {
      console.log('Write Save');
      db.collection('counter').updateOne({name: 'postCount'}, {$inc : {totalPost: 1}}, function(err, result) {
        if(err) return console.log(err);
      })
    })
  });
  res.send('Good Job');
});

app.get('/list', function(req, res) {
  db.collection('post').find().toArray(function(err, result) {
    res.render('list.ejs', {posts: result});
  });
})

app.delete('/delete', function(req, res) {
  req.body._id = parseInt(req.body._id);
  console.log(req.body);
  db.collection('post').deleteOne(req.body, function(err, result) {
    console.log('delete success');
    res.status(200).send({message: 'success'});
  })
})

app.get('/detail/:id', function(req, res) {
  db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err, result) {
    res.render('detail.ejs', {data : result})
  })
})