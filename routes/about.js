var express = require('express');
var router = express.Router();

router.get('/lienhe', function(req, res, next) {
  res.render('lienhe', { tieude: 'Gear Srore | Liên hệ',trangthai:"Liên hệ" });
});

module.exports = router;
