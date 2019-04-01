var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID;
var xl_mongo = require('../public/js/KET_NOI')

router.get('/', async function (req, res, next) {
  let db = await xl_mongo.Get();
  var thuonghieu;
  await db.collection('thuong_hieu').find({}).toArray((err, res) => {
    thuonghieu=res
  });
  await db.collection('san_pham').aggregate([{
      $sort: {
        ngay_tao: 1,
      }
    },
    { $limit : 12 },
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
      res.render('trangchu', {
        tieude: 'Trang chủ',
        sanpham: result,
        thuonghieu: thuonghieu
      });
  });
});

module.exports = router;