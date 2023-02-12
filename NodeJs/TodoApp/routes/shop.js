var router = require('express').Router(); //라우터 파일 필수 모듈

router.get('/shirts', function(req, res) {
  res.send('shirts');
})

router.get('/pants', function(req, res) {
  res.send('pants');
})

module.exports = router