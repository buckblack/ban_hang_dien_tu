var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham = 'san_pham'
cl_hoa_don = 'hoa_don'

router.get('/:tensp/:id/:maloai', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_san_pham).aggregate([{
      $match: {
        '_id': ObjectId(req.params.id)
      }
    }, {
      $lookup: {
        from: 'loai_san_pham',
        localField: 'ma_loai',
        foreignField: '_id',
        as: 'loaisp'
      }
    },
    {
      $unwind: {
        path: "$binh_luan",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "nguoi_dung",
        localField: "binh_luan.khach_hang",
        foreignField: "_id",
        as: "binh_luan.khach_hang"
      }
    },
    {
      $unwind: {
        path: "$binh_luan.khach_hang",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: "$_id",
        ten_sp: {
          "$first": "$ten_sp"
        },
        loaisp: {
          "$first": "$loaisp"
        },
        gia_ban: {
          "$first": "$gia_ban"
        },
        bao_hanh: {
          "$first": "$bao_hanh"
        },
        so_luong: {
          "$first": "$so_luong"
        },
        hinh_anh: {
          "$first": "$hinh_anh"
        },
        noi_dung: {
          "$first": "$noi_dung"
        },
        trang_thai: {
          "$first": "$trang_thai"
        },
        diem_so: {
          "$first": "$diem_so"
        },
        binh_luan: {
          "$push": "$binh_luan"
        }
      }
    }
  ]).toArray(function (err, sanpham) {
    if (sanpham[0].binh_luan[0].khach_hang != undefined) {
      sanpham[0].binh_luan.forEach(row => {
        delete row.khach_hang.password
      });
    } else {
      sanpham[0].binh_luan = []
    }
    db.collection(cl_san_pham).aggregate([{
        $match: {
          'ma_loai': ObjectId(req.params.maloai),
          '_id': {
            $ne: ObjectId(req.params.id)
          }
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
        $limit: 8
      }
    ]).toArray(function (er, sp_cungloai) {
      res.render('chitiet', {
        tieude: 'Gear Srore | Chi Tiết sản phẩm',
        trangthai: 'Chi tiết sản phẩm',
        sanpham: sanpham,
        sanpham_cungloai: sp_cungloai
      });
    });
  });


});

router.post('/binhluan', async function (req, res, next) {
  let db = await xl_mongo.Get();
  var dk_tim={
    '_id': ObjectId(req.body.id_sp),
    'binh_luan.khach_hang':ObjectId(req.body.id_kh)
  }
  var bl={
    'khach_hang':ObjectId(req.body.id_kh),
    'noi_dung': req.body.noi_dung,
    //'ma_bl': ObjectId()
  }
  await db.collection(cl_san_pham).find(dk_tim).toArray(function (err, result) {
    if(result.length!=0)
    {
      res.json({'errorCode':1,'message':'Bạn đã đánh giá sản phẩm này rồi!'})
    }
    else
    {
      db.collection(cl_hoa_don).find({'khach_hang':ObjectId(req.body.id_kh),'chi_tiet.san_pham':ObjectId(req.body.id_sp)}).toArray((err_hd,res_hd)=>{
        if(res_hd.length==0)
        {
          res.json({'errorCode':2,'message':'Bạn chưa mua sản phẩm này'})
        }
        else
        {
          db.collection(cl_san_pham).update({'_id': ObjectId(req.body.id_sp)},{
            $push: {
              binh_luan: bl,
              diem_so: Number(req.body.diem)
            }
          },()=>{
            res.json({'errorCode':0,'message':'Đánh giá thành công'})
          })
        }
      })
    }
  });


});
module.exports = router;