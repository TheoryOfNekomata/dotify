var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<style>html{width:100%;height:100%;display:grid;place-content:center;font-size:20vmin}body{width:100%;height:100%}</style><body>di pre</body>')
});

module.exports = router;
