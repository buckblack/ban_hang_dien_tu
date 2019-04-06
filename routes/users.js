var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/users',{tieude:'Gear Srore | Tài khoản',trangthai:'Tài khoản'});
});

router.get('/doi-mat-khau', function(req, res, next) {
  res.render('users/doimatkhau',{tieude:'Gear Srore | Đổi mật khẩu',trangthai:'Đổi mật khẩu'});
});

router.get('/don-hang', function(req, res, next) {
  res.render('users/donhang',{tieude:'Gear Srore | Đơn hàng',trangthai:'Đơn hàng'});
});

router.get('/don-hang/:id', function(req, res, next) {
  res.render('users/chitietdonhang',{tieude:'Gear Srore | Chi tiết đơn hàng',trangthai:'Chi tiết đơn hàng',madonhang:req.params.id});
});

module.exports = router;

