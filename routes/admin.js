var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/san_pham', {});
});

router.get('/san-pham', function(req, res, next) {
  res.render('admin/san_pham', {});
});

router.get('/hoa-don', function(req, res, next) {
  res.render('admin/hoa_don', {});
});

router.get('/tai-khoan', function(req, res, next) {
  res.render('admin/tai_khoan', {});
});

router.get('/thong-ke-hoa-don', function(req, res, next) {
  res.render('admin/thong_ke_hoa_don', {});
});

router.get('/thong-ke-san-pham', function(req, res, next) {
  res.render('admin/thong_ke_san_pham', {});
});

router.get('/nhap-hang', function(req, res, next) {
  res.render('admin/nhap_hang', {});
});

module.exports = router;
