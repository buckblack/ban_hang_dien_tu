var express = require('express');
var router = express.Router();

router.get('/dangky', function(req, res, next) {
  res.render('dangky', { tieude: 'Đăng ký',trangthai:"Đăng ký" });
});

router.get('/dangnhap', function(req, res, next) {
  res.render('dangnhap', { tieude: 'Đăng nhập',trangthai:"Đăng nhập" });
});

router.post('/dangnhap', function(req, res, next) {
  if(req.body.ten_dang_nhap=="admin")
    res.render('dangnhap', { tieude: 'Đăng nhập',trangthai:"post" });
  else {
    res.render('dangky', { tieude: 'Đăng nhập',trangthai:"post" });
  }
});

module.exports = router;
