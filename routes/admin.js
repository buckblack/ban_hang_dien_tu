var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_hoa_don = 'hoa_don'
cl_san_pham = 'san_pham'
cl_thong_bao = 'thong_bao'
cl_thuong_hieu='thuong_hieu'
cl_loai_san_pham='loai_san_pham'

router.get('/', function (req, res, next) {
  res.render('admin/san_pham', {});
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
    db.collection(cl_thuong_hieu).find({}).toArray((err_th,res_th)=>{
      db.collection(cl_loai_san_pham).find({}).toArray((err_loai,res_loai)=>{
        res.render('admin/san_pham', { san_pham: result, thuong_hieu:res_th, loai_san_pham:res_loai});
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
    db.collection(cl_thuong_hieu).find({}).toArray((err_th,res_th)=>{
      db.collection(cl_loai_san_pham).find({}).toArray((err_loai,res_loai)=>{
        var data={
          san_pham:res_sp[0],
          thuong_hieu:res_th,
          loai_san_pham:res_loai
        }
        res.json(JSON.stringify(data));
      })
    })
    
  });
});

router.get('/hoa-don', function (req, res, next) {
  res.render('admin/hoa_don', {});
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

module.exports = router;
