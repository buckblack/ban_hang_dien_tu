var express = require('express');
var router = express.Router();
var fs = require("fs")
var md5 = require("md5")
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
var xl_image = require('../public/js/xl_luu_image')
cl_hoa_don = 'hoa_don'
cl_san_pham = 'san_pham'
cl_thong_bao = 'thong_bao'
cl_thuong_hieu = 'thuong_hieu'
cl_loai_san_pham = 'loai_san_pham'

router.get('/', function (req, res, next) {
  res.redirect('/admin/dang-nhap');
});

router.get('/dang-nhap', function (req, res, next) {
  res.render('admin/dang_nhap', {});
});
router.post('/dang-nhap', async function (req, res, next) {
  let db = await xl_mongo.Get();
  var dk = { 'email': req.body.email, 'password': md5(req.body.password), 'chuc_vu': 'nhân viên' }
  await db.collection(cl_nguoi_dung).find(dk).toArray((err, result) => {
    if (result.length != 1) {
      var kq = { 'errorCode': 1, 'message': 'Sai tên đăng nhập hoặc mật khẩu' }
      res.json(JSON.stringify(kq))
    }
    else {
      if (result[0].trang_thai == 'khóa') {
        var kq = { 'errorCode': 2, 'message': 'Tài khoản đã bị khóa' }
        res.json(JSON.stringify(kq))
      }
      else {
        var kq = {
          'errorCode': 0,
          'message': 'Đăng nhập thành công',
          'nv_Id': result[0]._id,
          'nv_Ten': result[0].ho_ten,
          'nv_Email': result[0].email,
          'nv_Dia_chi': result[0].dia_chi,
          'nv_Dien_thoai': result[0].dien_thoai,
          'nv_Gioi_tinh': result[0].gioi_tinh,
        }
        res.json(JSON.stringify(kq))
      }

    }
  })
});

router.get('/san-pham', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_san_pham).aggregate([
    {
      $sort: {
        ngay_tao: -1,
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
  ]).toArray(function (err, result) {
    db.collection(cl_thuong_hieu).find({}).toArray((err_th, res_th) => {
      db.collection(cl_loai_san_pham).find({}).toArray((err_loai, res_loai) => {
        res.render('admin/san_pham', { san_pham: result, thuong_hieu: res_th, loai_san_pham: res_loai });
      })
    })

  });

});
router.get('/cap-nhap-san-pham/:id', async function (req, res, next) {
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
  ]).toArray(function (err_sp, res_sp) {
    db.collection(cl_thuong_hieu).find({}).toArray((err_th, res_th) => {
      db.collection(cl_loai_san_pham).find({}).toArray((err_loai, res_loai) => {
        var data = {
          san_pham: res_sp[0],
          thuong_hieu: res_th,
          loai_san_pham: res_loai
        }
        res.json(JSON.stringify(data));
      })
    })

  });
});

router.get('/hoa-don/', async function (req, res, next) {
  var page
  var sort
  if (req.query.page == undefined) {
    page = 1;
  }
  else {
    page = Number(req.query.page)
  }
  if (req.query.sort == undefined) {
    sort = 0;
  }
  else {
    sort = Number(req.query.sort)
  }
  let db = await xl_mongo.Get();
  var dk
  if(sort==0)
  {
    dk={}
  } else if(sort==1)
  {
    dk={'trang_thai':'Chưa xác nhận'}
  }else if(sort==2)
  {
    dk={'trang_thai':'Đã xác nhận'}
  }else if(sort==3)
  {
    dk={'trang_thai':'Đã thanh toán'}
  }else if(sort==4)
  {
    dk={'trang_thai':'Đã hủy'}
  }
  db.collection(cl_hoa_don).aggregate([
    {
      $match:dk
    },
    { $sort: { ngay_lap: -1 } },
    { $skip: (Number(page)-1) * 5 },
    {
      $limit: 5
    },
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
  ]).toArray((err, result) => {
    db.collection(cl_hoa_don).countDocuments(dk, (e,tong_hd)=>{
      var so_trang=Math.ceil(tong_hd/5)
      res.render('admin/hoa_don', { hoa_don: result,so_trang:so_trang,page_active:page,sort:sort});
    })
    
  })

});
router.post('/xac-nhan-hoa-don/', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_hoa_don).update({_id:ObjectId(req.body.ma_hd)},{$set:{'trang_thai':'Đã xác nhận','ghi_chu':req.body.ghi_chu}},()=>{
    res.json({erroCode:0,message:'Xác nhận thành công'})
  })
});
router.post('/xac-nhan-da-thanh-toan/', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_hoa_don).update({_id:ObjectId(req.body.ma_hd)},{$set:{'trang_thai':'Đã thanh toán','ghi_chu':req.body.ghi_chu}},()=>{
    res.json({erroCode:0,message:'Xác nhận thành công'})
  })
});


router.get('/tai-khoan', function (req, res, next) {
  res.render('admin/tai_khoan', {});
});

router.get('/thong-ke-hoa-don', function (req, res, next) {
  res.render('admin/thong_ke_hoa_don', {});
});

router.post('/thong-ke-hoa-don', async function (req, res, next) {
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
  ]).toArray((err, result) => {
    res.json(result)
  })
});


router.post('/thong-ke-san-pham', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_hoa_don).find({}).toArray((err, res_hd) => {
    db.collection(cl_san_pham).aggregate([
      {
        $lookup: {
          from: 'loai_san_pham',
          localField: 'ma_loai',
          foreignField: '_id',
          as: 'loaisp'
        }
      }
    ]).toArray((err, res_sp) => {
      res.json({ san_pham: res_sp, hoa_don: res_hd })
    })
  })
});

router.get('/thong-ke-san-pham', function (req, res, next) {
  res.render('admin/thong_ke_san_pham', {});
});

router.get('/nhap-hang', function (req, res, next) {
  res.render('admin/nhap_hang', {});
});

router.get('/thong-bao', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_thong_bao).find({}).toArray((err, result) => {
    res.render('admin/thong_bao', { thong_bao: result });
  })
});
router.post('/xoa-1-thong-bao', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_thong_bao).remove({ 'ma_hd': Number(req.body.ma_hd) }, (err, result) => {
    res.json({ 'erroCode': 0 });
  })
});
router.post('/xoa-thong-bao', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_thong_bao).remove({}, (err, result) => {
    res.json({ 'erroCode': 0, 'message': 'Xóa thành công' });
  })
});

router.post('/dem-thong-bao', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_thong_bao).find({}).toArray((err, result) => {
    res.json({ 'so_thong_bao': result.length })
  })
});

router.post('/them-san-pham', async function (req, res, next) {
  var hinh = JSON.parse(req.body.hinh);
  var san_pham = JSON.parse(req.body.san_pham);
  var sp = {
    "ten_sp": san_pham.ten_sp,
    "ma_thuong_hieu": ObjectId(san_pham.ma_thuong_hieu),
    "ma_loai": ObjectId(san_pham.ma_loai),
    "gia_ban": Number(san_pham.gia_ban),
    "bao_hanh": Number(san_pham.bao_hanh),
    "so_luong": 0,
    "hinh_anh": san_pham.hinh_anh,
    "noi_dung": san_pham.noi_dung,
    "ngay_tao": new Date(),
    "binh_luan": [],
    "trang_thai": "kinh doanh",
    "diem_so": [5],
  }
  let db = await xl_mongo.Get();
  await db.collection(cl_san_pham).insert(sp, (err, result) => {
    try {
      fs.unlinkSync(`./public/images/${hinh.thu_muc}/${hinh.Ten}`);
    } catch (error) {
    }
    xl_image.Ghi_Nhi_phan_Media(hinh.Ten, hinh.Chuoi_nhi_phan, hinh.thu_muc)
    res.json({ errrCode: 0, message: 'Thêm thành công' });
  })
});

router.post('/cap-nhat-san-pham', async function (req, res, next) {
  if (req.body.hinh == '') {
    var san_pham = JSON.parse(req.body.san_pham);
    var sp = {
      "ten_sp": san_pham.ten_sp,
      "ma_thuong_hieu": ObjectId(san_pham.ma_thuong_hieu),
      "ma_loai": ObjectId(san_pham.ma_loai),
      "gia_ban":Number(san_pham.gia_ban),
      "bao_hanh": Number(san_pham.bao_hanh),
      "noi_dung": san_pham.noi_dung,
      "trang_thai": san_pham.trang_thai
    }
    let db = await xl_mongo.Get();
    db.collection(cl_san_pham).aggregate([
      {
        $match: { _id: ObjectId(san_pham.ma_sp) }
      },
      {
        $lookup: {
          from: 'loai_san_pham',
          localField: 'ma_loai',
          foreignField: '_id',
          as: 'loaisp'
        }
      }
    ]).toArray((err_sp, res_sp) => {
      console.log(req.body.thu_muc)
      db.collection(cl_san_pham).update({ '_id': ObjectId(san_pham.ma_sp) }, { $set: sp }, (err, result) => {
        if (req.body.thu_muc != res_sp[0].loaisp[0].thu_muc_hinh) {
          var oldPath = `./public/images/${res_sp[0].loaisp[0].thu_muc_hinh}/${res_sp[0].hinh_anh}`
          var newPath = `./public/images/${req.body.thu_muc}/${res_sp[0].hinh_anh}`
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              if (err.code === 'EXDEV') {
                copy();
              } else {
              }
              return;
            }
          });
        }
        res.json({ errrCode: 0, message: 'Cập nhật thành công' });
      })
    })
  }
  else {
    var hinh = JSON.parse(req.body.hinh);
    console.log(hinh.thu_muc);

    var san_pham = JSON.parse(req.body.san_pham);
    var sp = {
      "ten_sp": san_pham.ten_sp,
      "ma_thuong_hieu": ObjectId(san_pham.ma_thuong_hieu),
      "ma_loai": ObjectId(san_pham.ma_loai),
      "gia_ban": Number(san_pham.gia_ban),
      "bao_hanh": Number(san_pham.bao_hanh),
      "hinh_anh": san_pham.hinh_anh,
      "noi_dung": san_pham.noi_dung,
      "trang_thai": san_pham.trang_thai
    }
    let db = await xl_mongo.Get();
    await db.collection(cl_san_pham).update({ '_id': ObjectId(san_pham.ma_sp) }, { $set: sp }, (err, result) => {
      try {
        fs.unlinkSync(`./public/images/${hinh.thu_muc}/${hinh.Ten}`);
      } catch (error) {
      }
      xl_image.Ghi_Nhi_phan_Media(hinh.Ten, hinh.Chuoi_nhi_phan, hinh.thu_muc)
      res.json({ errrCode: 0, message: 'Cập nhật thành công' });
    })
  }

});

module.exports = router;
