var express = require('express');
var router = express.Router();

router.get('/404', function(req, res, next) {
  res.render('404', { tieude: 'Lỗi 404',trangthai:"Lỗi 404" });
});

module.exports = router;
