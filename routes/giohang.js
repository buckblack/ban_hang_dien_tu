var express = require('express');
var router = express.Router();

router.get('/giohang', function(req, res, next) {
  res.render('giohang', { tieude: 'Giỏ hàng',trangthai:"Giỏ hàng" });
});

module.exports = router;
