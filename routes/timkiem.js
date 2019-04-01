var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'
router.get('/:id', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).aggregate([
    {
      $match:
      {
        'ten_sp':{'$regex': req.params.id}
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
    res.render('timkiem', { tieude: 'Tìm kiếm',sanpham:result,trangthai:'Tìm kiếm'});
  });
});

router.get('/gio-hang/:id', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).aggregate([
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
    res.setHeader("Access-Control-Allow-Origin", '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.json(JSON.stringify(result));
    //res.json(result);
  });
});

module.exports = router;
