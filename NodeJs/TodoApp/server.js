require('dotenv').config();
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');
const methodoverride = require('method-override');
app.use(methodoverride('_method'));
const passport = require('passport');
const Localstoragey = require('passport-local').Strategy;
const session = require('express-session');
app.use(session({secret: '비밀코드', resave: true, saveUninitialized: false}));

app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('../public', express.static('public'));

var db; //자료를 저장할 변수 필요

MongoClient.connect(process.env.DB_URL, function(err, client) {
  if(err) return console.log(err);

  db = client.db('todoapp'); //todoapp 이라는 database에 연결

  app.listen(process.env.PORT, function(req, res) {
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

app.get('/list', function(req, res) {
  db.collection('post').find().toArray(function(err, result) {
    res.render('list.ejs', {posts: result});
  });
})

app.get('/detail/:id', function(req, res) {
  db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err, result) {
    res.render('detail.ejs', {data : result})
  })
})

app.get('/edit/:id', function(req, res) {
  db.collection('post').findOne({_id: parseInt(req.params.id)}, function(err, result) {
    res.render('edit.ejs', {data: result}) 
  })
})

app.put('/edit', function(req, res) {
  db.collection('post').updateOne({_id: parseInt(req.body.id)}, {$set: {title: req.body.title, date: req.body.date}}, function(err, result) {
    console.log('Edit success')
    res.redirect('/list')
  })
})

app.get('/login', function(req, res) {
  res.render('login.ejs')
})

app.post('/login',passport.authenticate('local', {
  failureRedirect: '/fail'
}) ,function(req, res) {
  res.redirect('/')
})

passport.use(new Localstoragey({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (inputId, inputPw, done) {
  db.collection('login').findOne({ id: inputId }, function (err, result) {
    if (err) return done(err)
    if (!result) return done(null, false, { message: '존재하지않는 아이디요' })
    if (inputPw == result.pw) {
      return done(null, result)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

passport.serializeUser(function(user, done) { //로그인 성공시 사용됨
  done(null, user.id);
});
passport.deserializeUser(function(id, done) { //나중에 마이페이지 접속시 사용됨
  db.collection('login').findOne({id: id}, function(err, result) {
    done(null, result)
  })
});

app.post('/register', function(req, res) {
  db.collection('login').insertOne({id : req.body.id, pw: req.body.pw}, function(err, result) {
    res.redirect('/')
  })
})

app.get('/mypage', login, function(req, res) {
  console.log(req.user);
  res.render('mypage.ejs', {user :req.user});
})

function login(req, res, next) {
  if(req.user) {
    next()
  } else {
    res.send('Not Logined')
  }
}

// app.get('/search', (req, res) => {
//   db.collection('post').find({$text: {$search : req.query.value}}).toArray((err, result) => {
//     res.render('searchlist.ejs', {posts: result});
//   })
// })

app.get('/search', (req, res) => {
  var searchPromise = [
    {
      $search: {
        index: 'titleSearch',
        text: {
          query: req.query.value,
          path: 'title'
        }
      }
    }
  ]
  db.collection('post').aggregate(searchPromise).toArray((err, result) => {
    res.render('searchlist.ejs', {posts: result})
  })
})

app.post('/add', function(req,res) {
  db.collection('counter').findOne({name: 'postCount'}, function(err, result) {
    var totalPost = result.totalPost;
    var store = {_id: totalPost+1, writer: req.user._id, title: req.body.title, date: req.body.date};
    db.collection('post').insertOne(store, function(err, res) {
      console.log('Write Save');
      db.collection('counter').updateOne({name: 'postCount'}, {$inc : {totalPost: 1}}, function(err, result) {
        if(err) return console.log(err);
      })
    })
  });
  res.send('Good Job');
});

app.delete('/delete', function(req, res) {
  req.body._id = parseInt(req.body._id);
  console.log(req.body);
  var deleteData = {_id: req.body._id, writer: req.user._id};
  db.collection('post').deleteOne(deleteData, function(err, result) {
    console.log('delete success');
    if(err) {console.log(err)}
    res.status(200).send({message: 'success'});
  })
})

app.use('/shop', require('./routes/shop'));
app.use('/board/sub', require('./routes/board'));

app.get('/upload', function(req, res) {
  res.render('upload.ejs')
})

let multer = require('multer');
const { ObjectId } = require('mongodb');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/image')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({storage: storage});

app.post('/upload', upload.single('profile'), function(req, res) {
  res.send('upload success');
}) 

app.get('/image/:img', function(req,res) {
  res.sendFile(__dirname + '/public/image/' + req.params.img);
})

app.post('/chatroom', login, function(req, res) {
  var store = {
    title: 'chat1',
    member: [req.user._id, ObjectId(req.body.writerId)],
    date: new Date()
  }
  db.collection('chatroom').insertOne(store).then((result) => {
    res.send('success');
  })
})

app.get('/chat', login, function(req,res) {
  db.collection('chatroom').find({member: req.user._id}).toArray().then((result) => {
    res.render('chat.ejs', {data: result});
  })
})

app.post('/message', login, function(req,res) {
  var store = {
    parent: req.body.parent,
    content: req.body.content,
    userid: req.user._id,
    date: new Date()
  }
  db.collection('message').insertOne(store).then(() => {
    res.send('db store success');
  })
})

app.get('/message/:id', login, function(req, res) {
  res.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  db.collection('message').find({parent: req.params.id}).toArray().then((result) => {
    res.write('event: test\n');
    res.write('data: ' + JSON.stringify(result) + '\n\n');
  })
  const pipeline = [
    { $match: { 'fullDocument.parent' : req.params.id } } 
  ];
  const collection = db.collection('message');
  const changeStream = collection.watch(pipeline);
  changeStream.on('change', (result) => {
    res.write('event: test\n');
    res.write('data: ' + JSON.stringify([result.fullDocument]) + '\n\n');
  });
});