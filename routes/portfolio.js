var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/khs02', function(req, res, next) {
  res.render('/khs02/index.html', {  });
});

module.exports = router;
