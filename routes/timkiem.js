var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
var md5 = require('md5');
cl_san_pham = 'san_pham'
cl_nguoi_dung = 'nguoi_dung'
cl_hoa_don="hoa_don"

router.get('/:id', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).aggregate([
    {
      $match:{trang_thai:'kinh doanh'}
    },
    {
      $lookup: {
        from: 'loai_san_pham',
        localField: 'ma_loai',
        foreignField: '_id',
        as: 'loaisp'
      }
    }
  ]).toArray(function (err, result) {
    var kq= result.filter(x => x.ten_sp.toLowerCase().includes(req.params.id.trim().toLowerCase()));
    res.render('timkiem', {
      tieude: 'Gear Srore | Tìm kiếm',
      sanpham: JSON.stringify(kq),
      trangthai: 'Tìm kiếm'
    });
  });
});


router.get('/gio-hang/:id', async function (req, res, next) {
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
  ]).toArray(function (err, result) {
    res.json(JSON.stringify(result));
  });
});

/*router.get('/a/a/a', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).updateMany({},{$set:{
    diem_so: [5]
  }})
});*/


/*router.get('/a/a/a', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection('hoa_don').find({
    'chi_tiet.san_pham': ObjectId('5ca20815b904c50b98b00894'),
    'khach_hang':ObjectId('5ca20797b904c50b98b00893')
  }).toArray((err, result) => {
    res.json(result)
  })
});*/
router.post('/hoa-don', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_hoa_don).aggregate([
    {
      $match:{_id:ObjectId(req.body.id_hd)}
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
        ma_hd: {
          "$first": "$ma_hd"
        },
        ngay_lap: {
          "$first": "$ngay_lap"
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
    res.json(sanpham)
  });
});

module.exports = router;