var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_hoa_don='hoa_don'
cl_nguoi_dung='nguoi_dung'

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

router.post('/don-hang',async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_hoa_don).find({'khach_hang':ObjectId(req.body.khach_hang_Id),'loai_hd':'xuất'}).sort({ngay_lap: -1}).toArray((error,result)=>{
    res.json(result)
  });
});

router.post('/cap-nhat',async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_nguoi_dung).update({'_id':ObjectId(req.body.id)},{$set:{
    'ho_ten':req.body.ho_ten,
    'dia_chi':req.body.dia_chi,
    'dien_thoai':req.body.dien_thoai
  }},()=>{
    res.json({
      'message':'Cập nhật thành công',
      'ho_ten':req.body.ho_ten,
      'dia_chi':req.body.dia_chi,
      'dien_thoai':req.body.dien_thoai
    })
  })
});

router.post('/don-hang/chi-tiet',async function(req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_hoa_don).aggregate([
    {
      $match: { "_id": ObjectId(req.body.id_hoa_don) }
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
    },
    {
      $unwind: {
        path: "$chi_tiet",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "san_pham",
        localField: "chi_tiet.san_pham",
        foreignField: "_id",
        as: "chi_tiet.san_pham"
      }
    },
    {
      $unwind: {
        path: "$chi_tiet.san_pham",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: "$_id",
        khach_hang: {
          "$first": "$khach_hang"
        },
        nhan_vien: {
          "$first": "$nhan_vien"
        },
        trang_thai: {
          "$first": "$trang_thai"
        },
        chi_tiet: {
          "$push": "$chi_tiet"
        }
      }
    }
  ]).toArray(function (err, sanpham) {
    res.json(sanpham[0].chi_tiet)
  });
});

router.get('/in-hoa-don/:id',async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_hoa_don).aggregate([
    {
      $match: { "_id": ObjectId(req.params.id) }
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
      $unwind: {
        path: "$chi_tiet",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "san_pham",
        localField: "chi_tiet.san_pham",
        foreignField: "_id",
        as: "chi_tiet.san_pham"
      }
    },
    {
      $unwind: {
        path: "$chi_tiet.san_pham",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: "$_id",
        khach_hang: {
          "$first": "$khach_hang"
        },
        ma_hd: {
          "$first": "$ma_hd"
        },
        chi_tiet: {
          "$push": "$chi_tiet"
        }
      }
    }
  ]).toArray((error,result)=>{
    res.render('users/in_hoa_don',{hoadon: result});
  });
});

module.exports = router;
