var express = require('express');
var router = express.Router();

router.get('/lienhe', function(req, res, next) {
  res.render('lienhe', { tieude: 'Liên hệ',trangthai:"Liên hệ" });
});

router.get('/gioithieu', function(req, res, next) {
  res.render('gioithieu', { tieude: 'Giới thiệu',trangthai:"Giới thiệu" });
});

module.exports = router;
