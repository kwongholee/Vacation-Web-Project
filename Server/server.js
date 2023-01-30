const express = require('express');
const app = express();
const path = require('path');

app.listen(8080, function() {
  console.log('listening on 8080');
})

app.use(express.json());
var cors = require('cors');
app.use(cors()); //위에 3줄 추가해야 ajax 잘됨

app.use(express.static(path.join(__dirname, 'server/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'server/build/index.html'));
})

app.get('/product', function(req,res) {
  res.json({name: 'black'}); // 유저에게 데이터 전송
}) // DB에서 데이터 받아오는 법 + 리액트는 이 주소로 Get 요청 날리면 됨

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname, 'server/build/index.html'))
}) // 리액트 라우터 사용 시 최하단에 이거 적어놓으면 됨()

// 일반적으로 DB에서 서버로 데이터 전송 => 서버에서 데이터를 html에 끼워맞춤 => 완성된 html을 프론트로 전달(server-side rendering)
// 리액트는 DB에서 서버를 거쳐 프론트로 데이터 전송 => 리액트가 알아서 html을 자동완성시킴(client-side rendering)