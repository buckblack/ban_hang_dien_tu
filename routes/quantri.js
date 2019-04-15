var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
var md5=require('md5');
cl_nguoi_dung = 'nguoi_dung'

router.get('/', function(req, res, next) {
  res.redirect('/quantri/nhan-vien');
});

router.get('/nhan-vien',async function(req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_nguoi_dung).find({'chuc_vu':'nhân viên'}).toArray((err,result)=>{
    res.render('quan_tri/nhan_vien', {nhan_vien:result});
  })
});

router.post('/dang-nhap',async function(req, res, next) {
  let db = await xl_mongo.Get();
  var dk={'email':req.body.email,'password':md5(req.body.password),'chuc_vu':'quản trị'}
  await db.collection(cl_nguoi_dung).find(dk).toArray((err,result)=>{
    if(result.length!=1)
    {
      var kq={'errorCode':1, 'message':'Sai tên đăng nhập hoặc mật khẩu'}
      res.json(JSON.stringify(kq))
    }
    else
    {
      if(result[0].trang_thai=='khóa')
      {
        var kq={'errorCode':2, 'message':'Tài khoản đã bị khóa'}
        res.json(JSON.stringify(kq))
      }
      else
      {
        var kq={
          'errorCode':0,
          'message':'Đăng nhập thành công',
          'qt_Id': result[0]._id,
          'qt_Ten': result[0].ho_ten,
          'qt_Email': result[0].email,
          'qt_Dia_chi': result[0].dia_chi,
          'qt_Dien_thoai': result[0].dien_thoai,
          'qt_Gioi_tinh': result[0].gioi_tinh,
        }
        res.json(JSON.stringify(kq))
      }
      
    }
    
  })
});

router.get('/dang-nhap', function(req, res, next) {
  res.render('quan_tri/dang_nhap', {});
});


router.post('/them-nhan-vien',async function(req, res, next) {
  let db = await xl_mongo.Get();
  var dk={'email':req.body.email,'chuc_vu':'nhân viên'}
  await db.collection(cl_nguoi_dung).find(dk).toArray((err,result)=>{
    if(result.length>0)
    {
      var kq={'errorCode':1, 'message':'Email đã tồn tại'}
      res.json(JSON.stringify(kq))
    }
    else
    {
      var user={
        'email':req.body.email,
        'ho_ten' : req.body.ho_ten,
        'dia_chi' : req.body.dia_chi,
        'password' : md5(req.body.password),
        'chuc_vu' : 'nhân viên',
        'dien_thoai' : req.body.dien_thoai,
        'gioi_tinh' : req.body.gioi_tinh,
        'trang_thai' : req.body.trang_thai
      }
      db.collection(cl_nguoi_dung).insert(user,(loi,ket_qua)=>{
        var kq={
          'errorCode':0,
          'message':'Thêm thành công',
        }
        res.json(JSON.stringify(kq))
      })
    }
    
  })
});

router.post('/cap-nhat',async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_nguoi_dung).update({'_id':ObjectId(req.body.id)},{$set:{
    'ho_ten':req.body.ho_ten,
    'dia_chi':req.body.dia_chi,
    'dien_thoai':req.body.dien_thoai,
    'trang_thai':req.body.trang_thai,
    'gioi_tinh':req.body.gioi_tinh
  }},()=>{
    res.json({
      'message':'Cập nhật thành công',
      'errorCode':0
    })
  })
});



module.exports = router;
