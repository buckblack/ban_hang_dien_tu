var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
var md5 = require('md5');
cl_hoa_don = 'hoa_don'
cl_san_pham = 'san_pham'
cl_nguoi_dung = 'nguoi_dung'
cl_thuong_hieu = 'thuong_hieu'
cl_loai_san_pham='loai_san_pham'

//đăng nhập
router.post('/dang-nhap', async function (req, res, next) {
  let db = await xl_mongo.Get();
  var dk = { 'email': req.body.email, 'password': md5(req.body.password), 'chuc_vu': 'khách hàng' }
  await db.collection(cl_nguoi_dung).find(dk).toArray((err, result) => {
    if (result.length != 1) {
      var kq = { 'errorCode': 1, 'message': 'Sai tên đăng nhập hoặc mật khẩu' }
      res.json(JSON.stringify(kq))
    }
    else {
      if (result[0].trang_thai == 'khóa') {
        var kq = { 'errorCode': 2, 'message': 'Tài khoản đã bị khóa' }
        res.json(kq)
      }
      else {
        var kq = {
          'errorCode': 0,
          'message': 'Đăng nhập thành công',
          'data': {
            'khach_hang_Id': result[0]._id,
            'khach_hang_Ten': result[0].ho_ten,
            'khach_hang_Email': result[0].email,
            'khach_hang_Dia_chi': result[0].dia_chi,
            'khach_hang_Dien_thoai': result[0].dien_thoai,
          }
        }
        res.json(kq)
      }
    }
  })
});

//lấy thương hiệu
router.get('/lay-thuong-hieu', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_thuong_hieu).find({}).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      
      res.json(result)
    }
  })
});


//lấy loại sản phẩm
router.get('/lay-loai-san-pham', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_loai_san_pham).find({}).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      
      res.json(result)
    }
  })
});


//lấy danh sách sản phẩm nổi bật
router.get('/lay-san-pham-noi-bat', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({'hot':1}).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      
      res.json(result)
    }
  })
});

//lấy danh sách hóa đơn
router.get('/lay-hoa-don', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_hoa_don).find({}).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      
      res.json(result)
    }
  })
});


//lấy 1 hóa đơn
router.get('/lay-hoa-don/:id', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_hoa_don).aggregate([{
    $match: {
      '_id': ObjectId(req.params.id)
    }
  },
  {
    $lookup: {
      from: 'nguoi_dung',
      localField: 'khach_hang',
      foreignField: '_id',
      as: 'khachhang'
    }
  },
  {
    $lookup: {
      from: 'nguoi_dung',
      localField: 'nhan_vien',
      foreignField: '_id',
      as: 'nhanvien'
    }
  }
  ]).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      
      res.json(result)
    }
  })
});


//lấy 1 sản phẩm
router.get('/lay-san-pham/:id', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_san_pham).aggregate([{
    $match: {
      '_id': ObjectId(req.params.id)
    }
  },
  {
    $lookup: {
      from: 'loai_san_pham',
      localField: 'ma_loai',
      foreignField: '_id',
      as: 'loaisp'
    }
  },
  {
    $lookup: {
      from: 'thuong_hieu',
      localField: 'ma_thuong_hieu',
      foreignField: '_id',
      as: 'thuonghieu'
    }
  }
  ]).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      var kq = {
        'errorCode': 0,
        'message': '',
        'data': result[0]
      }
      res.json(kq)
    }
  })
});



module.exports = router;