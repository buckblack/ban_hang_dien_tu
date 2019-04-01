var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'

router.get('/:tensp/:id/:maloai',async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sp;
  var sp_cungloai;
  await db.collection(cl_san_pham).aggregate([
    {
      $match:
      {
        '_id':ObjectId(req.params.id)
      }
    },
    { $lookup:
       {
         from: 'loai_san_pham',
         localField: 'ma_loai',
         foreignField: '_id',
         as: 'loaisp'
       }
     }
   ]).toArray(function(err, result) {
    sp=result;
  });

  await db.collection(cl_san_pham).aggregate([
    {
      $match:
      {
        'ma_loai':ObjectId(req.params.maloai),
        '_id':{$ne:ObjectId(req.params.id)}
      }
    },
    { $lookup:
       {
         from: 'loai_san_pham',
         localField: 'ma_loai',
         foreignField: '_id',
         as: 'loaisp'
       }
     },
     {
       $limit:8
     }
   ]).toArray(function(err, result) {
    sp_cungloai=result;
    res.render('chitiet',{tieude:'Chi Tiết sản phẩm',trangthai:'Chi tiết sản phẩm',sanpham:sp,sanpham_cungloai:sp_cungloai});
  });

});

module.exports = router;
