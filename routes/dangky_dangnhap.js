var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
var Gui_thu = require("../public/js/xl_gui_thu")
var md5=require('md5');
cl_nguoi_dung = 'nguoi_dung'

router.get('/dangky', function(req, res, next) {
  res.render('dangky', { tieude: 'Đăng ký',trangthai:"Đăng ký" });
});

router.post('/dangky',async function(req, res, next) {
  let db = await xl_mongo.Get();
  var dk={'email':req.body.email,'chuc_vu':'khách hàng'}
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
        'chuc_vu' : req.body.chuc_vu,
        'dien_thoai' : req.body.dien_thoai,
        'gioi_tinh' : req.body.gioi_tinh,
        'trang_thai' : 'đang hoạt động'
      }
      db.collection(cl_nguoi_dung).insert(user,(loi,ket_qua)=>{
        var from = "long4581994@gmail.com"
        var to = req.body.email
        var subject = "Đăng ký tài khoản thành công"
        var body = `Chào ${req.body.ho_ten}. Cảm ơn bạn đã đăng ký làm thành viên của Gear Store`
        var kqPromise = Gui_thu.Gioi_Thu_Lien_he(from, to, subject, body)
        kqPromise.then(r => {
        }).catch(err => {
          console.log(err);
        })
        var kq={
          'errorCode':0,
          'message':'Đăng ký thành công',
        }
        res.json(JSON.stringify(kq))
      })
    }
    
  })
});

router.get('/dangnhap', function(req, res, next) {
  res.render('dangnhap', { tieude: 'Đăng nhập',trangthai:"Đăng nhập" });
});

router.post('/dangnhap',async function(req, res, next) {
  let db = await xl_mongo.Get();
  var dk={'email':req.body.email,'password':md5(req.body.password),'chuc_vu':'khách hàng'}
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
          'khach_hang_Id': result[0]._id,
          'khach_hang_Ten': result[0].ho_ten,
          'khach_hang_Email': result[0].email,
          'khach_hang_Dia_chi': result[0].dia_chi,
          'khach_hang_Dien_thoai': result[0].dien_thoai,
        }
        res.json(JSON.stringify(kq))
      }
      
    }
    
  })
});

router.post('/doimatkhau',async function(req, res, next) {
  let db = await xl_mongo.Get();
  var dk={'_id':ObjectId(req.body.id),'password':md5(req.body.mat_khau_hien_tai)}
  await db.collection(cl_nguoi_dung).find(dk).toArray((err,result)=>{
    if(result.length!=1)
    {
      var kq={'errorCode':1, 'message':'Mật khẩu hiện tại không đúng'}
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
        db.collection(cl_nguoi_dung).update({'_id':ObjectId(req.body.id)},{$set:{'password':md5(req.body.mat_khau_moi)}},(loi,ket_qua)=>{
          console.log(ket_qua);
          
          var kq={
            'errorCode':0,
            'message':'Đổi mật khẩu thành công',
          }
          res.json(JSON.stringify(kq))
        })
      }
      
    }
    
  })
});

/*router.post('/dangnhap', function(req, res, next) {
  if(req.body.ten_dang_nhap=="admin")
    res.render('dangnhap', { tieude: 'Đăng nhập',trangthai:"post" });
  else {
    res.render('dangky', { tieude: 'Đăng nhập',trangthai:"post" });
  }
});*/

module.exports = router;
