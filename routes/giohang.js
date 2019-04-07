var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham = 'san_pham'
cl_hoa_don = 'hoa_don'
cl_thong_bao = 'thong_bao'

router.get('/giohang', function(req, res, next) {
  res.render('giohang', { tieude: 'Gear Srore | Giỏ hàng',trangthai:"Giỏ hàng" });
});


router.post('/thanh-toan', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var ma_hd;
  var ct=JSON.parse(req.body.chi_tiet)
  await db.collection(cl_hoa_don).find({}).toArray((err_hd,res_hd)=>{
    ma_hd=Number(res_hd.length) +1
    var hd={
      'ma_hd':ma_hd,
      'khach_hang':ObjectId(req.body.khach_hang_Id),
      'nhan_vien':ObjectId('5ca20bb6b904c50b98b00897'),
      'ngay_lap':new Date(),
      'loai_hd':'xuất',
      'trang_thai':'Chưa xác nhận',
      'ghi_chu':'',
      'chi_tiet':[]
    }
    db.collection(cl_hoa_don).insert(hd,(err_ins,res_ins)=>{
      var dem=0;
      ct.forEach(row => {
        db.collection(cl_san_pham).find({'_id':ObjectId(row.id)}).toArray((err_serach,res_search)=>{
          var chi_tiet={
            'san_pham':ObjectId(row.id),
            'so_luong': row.so_luong,
            'gia_ban':res_search[0].gia_ban
          }
          db.collection(cl_hoa_don).update({'ma_hd': ma_hd}, {$push: {chi_tiet:chi_tiet}},()=>{
            var thong_bao={
              'ma_hd': ma_hd,
              'ngay_tao': new Date(),
              'noi_dung' : `Hóa đơn mới (${ma_hd}) cần xác nhận`
            }
            db.collection(cl_thong_bao).insert(thong_bao,(err_tb,res_tb)=>{
              dem++;
              if(dem==ct.length)
              {
                res.json({'errorCode':0,'ma_hd':ma_hd,'message':'Đặt hàng thành công'});
              }
            })
          });
        })
      });
    })
  })
});

module.exports = router;
