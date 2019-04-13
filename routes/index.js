var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_thuong_hieu='thuong_hieu'
cl_hoa_don='hoa_don'
cl_san_pham='san_pham'
cl_email_nhan_tin='email_nhan_tin'
router.get('/', async function (req, res, next) {
  let db = await xl_mongo.Get();
  var thuonghieu;
  await db.collection(cl_thuong_hieu).find({}).toArray((err, result) => {
    thuonghieu=result
  });
  await db.collection(cl_san_pham).aggregate([
    {
      $match:{trang_thai:'kinh doanh'}
    },
    {
      $sort: {
        ngay_tao: -1,
      }
    },
    { $limit : 8 },
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
        tieude: 'Gear Store | Trang chủ',
        sanpham: result,
        thuonghieu: thuonghieu
      });
  });
});

router.post('/', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_hoa_don).find({'loai_hd':'xuất'}).toArray(function (err, res_hd) {
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
  ]).toArray((err_sp, res_sp) => {
      var dem=0;
      res_sp.forEach(row_sp => {
        dem++;
        var soluong=0;
        //bắt đầu duyệt hóa đơn
        res_hd.forEach(row_hd => {
          var dem_ct=0;
          row_hd.chi_tiet.forEach(row_hd_ct => {
            dem_ct++
            if(row_sp._id.toString().trim()==row_hd_ct.san_pham.toString().trim())
            {
              soluong+=Number(row_hd_ct.so_luong)
            }
            if(dem_ct==row_hd.chi_tiet.length)
            {
              row_sp.so_luong_ban=soluong;
            }
          });
        });
        //kết thúc duyệt hóa đơn
        if(dem==res_sp.length)
        {
          res.json(JSON.stringify(res_sp))
        }
      });

    });
    
  });
});

router.post('/nhan-mail', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_email_nhan_tin).find({'email':req.body.email}).toArray((err,result)=>{
    if(result.length==0)
    {
      db.collection(cl_email_nhan_tin).insert({'email':req.body.email})
      res.json({'message':'Đăng ký nhận tin thành công'})
    }
    else
    {
      res.json({'message':'Email này đã đăng ký rồi'})
    }
  })
});
module.exports = router;