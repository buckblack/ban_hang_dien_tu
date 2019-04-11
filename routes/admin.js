var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_hoa_don='hoa_don'
cl_san_pham='san_pham'

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

router.post('/thong-ke-hoa-don', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_hoa_don).aggregate([
  {
    $lookup: {
      from: 'nguoi_dung',
      localField: 'khach_hang',
      foreignField: '_id',
      as: 'khach_hang'
    }
  },
  {
    $lookup: {
      from: 'nguoi_dung',
      localField: 'nhan_vien',
      foreignField: '_id',
      as: 'nhan_vien'
    }
  }
]).toArray((err,result)=>{
    res.json(result)
  })
});


router.post('/thong-ke-san-pham', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_hoa_don).find({}).toArray((err,res_hd)=>{
    db.collection(cl_san_pham).aggregate([
      {
        $lookup: {
          from: 'loai_san_pham',
          localField: 'ma_loai',
          foreignField: '_id',
          as: 'loaisp'
        }
      }
    ]).toArray((err,res_sp)=>{
      res.json({san_pham:res_sp,hoa_don:res_hd})
    })
  })
});

router.get('/thong-ke-san-pham', function(req, res, next) {
  res.render('admin/thong_ke_san_pham', {});
});

router.get('/nhap-hang', function(req, res, next) {
  res.render('admin/nhap_hang', {});
});

router.get('/thong-bao', function(req, res, next) {
  res.render('admin/thong_bao', {});
});

module.exports = router;
