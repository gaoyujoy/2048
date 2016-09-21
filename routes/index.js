var express = require('express');
var router = express.Router();
// var env = require('../nunjucks-config');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.html', {
    title: '好甜的白菜'
  });
});
router.get('/get', function (req, res, next) {
  res.send({
    todos: [1, 1, 1, 1, 1,1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1]
  });
});
module.exports = router;
