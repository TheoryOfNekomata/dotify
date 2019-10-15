var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/laman', function(req, res, next) {
  res.send('hayok')
})

router.get('/sabaw', (req, res, next) => {
  res.send('higop')
})

module.exports = router;
