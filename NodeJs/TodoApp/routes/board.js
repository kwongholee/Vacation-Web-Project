var router = require('express').Router();

router.get('/sports', function(req, res) {
  res.send('sports');
});

router.get('/games', function(req, res) {
  res.send('games');
});

module.exports = router;