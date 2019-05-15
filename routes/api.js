var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
var md5 = require('md5');
cl_hoa_don = 'hoa_don'
cl_san_pham = 'san_pham'
cl_nguoi_dung = 'nguoi_dung'
cl_thuong_hieu = 'thuong_hieu'
cl_loai_san_pham='loai_san_pham'
cl_nha_cung_cap='nha_cung_cap'


//đăng nhập
router.post('/dang-nhap', async function (req, res, next) {
  let db = await xl_mongo.Get();
  var dk = { 'email': req.body.email, 'password': md5(req.body.password), 'chuc_vu': 'khách hàng' }
  await db.collection(cl_nguoi_dung).find(dk).toArray((err, result) => {
    if (result.length != 1) {
      var kq = { 'errorCode': 1, 'message': 'Sai tên đăng nhập hoặc mật khẩu' }
      res.json(JSON.stringify(kq))
    }
    else {
      if (result[0].trang_thai == 'khóa') {
        var kq = { 'errorCode': 2, 'message': 'Tài khoản đã bị khóa' }
        res.json(kq)
      }
      else {
        var kq = {
          'errorCode': 0,
          'message': 'Đăng nhập thành công',
          'data': {
            'khach_hang_Id': result[0]._id,
            'khach_hang_Ten': result[0].ho_ten,
            'khach_hang_Email': result[0].email,
            'khach_hang_Dia_chi': result[0].dia_chi,
            'khach_hang_Dien_thoai': result[0].dien_thoai,
          }
        }
        res.json(kq)
      }
    }
  })
});

//thêm loại sản phẩm mới
router.post('/them-loai-san-pham',async function(req,res,next){
  var loai={'ten_loai':req.body.ten_loai,'thu_muc_hinh':req.body.thu_muc_hinh}
  let db=await xl_mongo.Get();
  await db.collection(cl_loai_san_pham).insert(loai,(err,result)=>{
    if(err)
    {
      var kq={'errorCode':1,'message':'Không thêm được'}
      res.json(kq)
    }
    else
    {
      var kq={
        'errorCode':0,
        'message':'Thêm thành công',
      }
      res.json(kq)
    }
  })
});

//thêm thương hiệu
router.post('/them-thuong-hieu',async function(req,res,next){
  var thuong_hieu={'ten_thuong_hieu':req.body.ten_thuong_hieu,'hinh':req.body.hinh}
  let db=await xl_mongo.Get();
  await db.collection(cl_thuong_hieu).insert(thuong_hieu,(err,result)=>{
    if(err)
    {
      var kq={'errorCode':1,'message':'Không thêm được'}
      res.json(kq)
    }
    else
    {
      var kq={
        'errorCode':0,
        'message':'Thêm thành công',
      }
      res.json(kq)
    }
  })
});

//lấy nhà cung cấp
router.get('/lay-nha-cung-cap', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_nha_cung_cap).find({}).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      var kq = {
        'errorCode': 0,
        'data':result
      }
      res.json(kq)
    }
  })
});

//thêm nhà cung cấp
router.post('/them-nha-cung-cap',async function(req,res,next){
  var nha_cung_cap={'ten_ncc':req.body.ten_ncc,'dia_chi':req.body.dia_chi,'dien_thoai':req.body.dien_thoai,'email':req.body.email}
  let db=await xl_mongo.Get();
  await db.collection(cl_nha_cung_cap).insert(nha_cung_cap,(err,result)=>{
    if(err)
    {
      var kq={'errorCode':1,'message':'Không thêm được'}
      res.json(kq)
    }
    else
    {
      var kq={
        'errorCode':0,
        'message':'Thêm thành công',
      }
      res.json(kq)
    }
  })
});

//lấy danh sách người dùng
router.get('/lay-nguoi-dung', async function (req, res, next) {
  let db = await xl_mongo.Get();
  var dk={'trang_thai':'đang hoạt động'}
  db.collection(cl_nguoi_dung).find(dk).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      var kq = {
        'errorCode': 0,
        'data':result
      }
      res.json(kq)
    }
  })
});

//lấy thương hiệu
router.get('/lay-thuong-hieu', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_thuong_hieu).find({}).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      var kq = {
        'errorCode': 0,
        'data':result
      }
      res.json(kq)
    }
  })
});


//lấy loại sản phẩm
router.get('/lay-loai-san-pham', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_loai_san_pham).find({}).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      var kq={
        'errorCode':0,
        'data':result
      }
      res.json(kq)
    }
  })
});




//lấy danh sách hóa đơn
router.get('/lay-hoa-don', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_hoa_don).aggregate([
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
        ghi_chu: {
          "$first": "$ghi_chu"
        },
        chi_tiet: {
          "$push": "$chi_tiet"
        }
      }
    }
  ]).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      var kq={
        'errorCode':0,
        'data':result
      }
      res.json(kq)
    }
  })
});


//lấy 1 hóa đơn
router.get('/lay-hoa-don/:id', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_hoa_don).aggregate([{
    $match: {
      '_id': ObjectId(req.params.id)
    }
  },
  {
    $lookup: {
      from: 'nguoi_dung',
      localField: 'khach_hang',
      foreignField: '_id',
      as: 'khachhang'
    }
  },
  {
    $lookup: {
      from: 'nguoi_dung',
      localField: 'nhan_vien',
      foreignField: '_id',
      as: 'nhanvien'
    }
  }
  ]).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      var kq={
        'errorCode':0,
        'data':result
      }
      res.json(kq)
    }
  })
});

//lấy sản phẩm
router.get('/lay-san-pham', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_san_pham).aggregate([
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
  ]).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      var kq = {
        'errorCode': 0,
        'message': '',
        'data': result
      }
      res.json(kq)
    }
  })
});

//lấy 1 sản phẩm
router.get('/lay-san-pham/:id', async function (req, res, next) {
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
  ]).toArray((err, result) => {
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      var kq = {
        'errorCode': 0,
        'message': '',
        'data': result[0]
      }
      res.json(kq)
    }
  })
});

//thêm sản phẩm
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

//Cập nhật sản phẩm
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

//hủy đơn hàng
router.post('/huy-don-hang/', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_hoa_don).find({_id:ObjectId(req.body.ma_hd)}).toArray((e,r)=>{
    if(r[0].trang_thai=='Chưa xác nhận')
    {
      db.collection(cl_hoa_don).update({_id:ObjectId(req.body.ma_hd)},{$set:{'nhan_vien':ObjectId(req.body.nv_Id),'trang_thai':'Đã hủy','ghi_chu':req.body.ghi_chu}},()=>{
        res.json({errorCode:0,message:'Hủy đơn hàng thành công'})
      })
    }
    else
    {
      res.json({errorCode:1,message:'Có lỗi xảy ra, xin thử lại...'})
    }
  })
});

//thống kê hóa đơn
router.post('/thong-ke-hoa-don', async function (req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_hoa_don).aggregate([
    {
      $match: {'loai_hd':'xuất'}
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
    res.json(result)
  })
});

//load giá của 1 sản phẩm
router.post('/load-gia-1-san-pham', async function (req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_san_pham).find({_id:ObjectId(req.body.ma_sp),trang_thai:'kinh doanh'}).toArray(function (err_th, result) {
    res.json({gia_ban:result[0].gia_ban});
  });
});

//load doanh thu trong 1 ngày
router.post('/doanh-thu-ngay', async function (req, res, next) {
  let db = await xl_mongo.Get();
  var ngay_ht=new Date().toISOString().split('T')[0]
  var from = new Date(ngay_ht+'T00:00:00.000Z');
  var to = new Date(ngay_ht+'T23:59:59.999Z');
  db.collection(cl_hoa_don).find({ 'ngay_lap': {$gte: from, $lt:to},'loai_hd':'xuất'}).toArray((err, result) => {
    var tongtien=0;
    result.forEach(row => {
      row.chi_tiet.forEach(row_ct => {
        tongtien+=Number(row_ct.so_luong)*Number(row_ct.gia_ban)
      });
    });
    res.json({erroCode:0,doanh_thu:tongtien})
  })
  
});

//load sản phẩm bán được trong ngày
router.post('/san-pham-ban-trong-ngay', async function (req, res, next) {
  let db = await xl_mongo.Get();
  var ngay_ht=new Date().toISOString().split('T')[0]
  var from = new Date(ngay_ht+'T00:00:00.000Z');
  var to = new Date(ngay_ht+'T23:59:59.999Z');
  db.collection(cl_hoa_don).find({ 'ngay_lap': {$gte: from, $lt:to},'loai_hd':'xuất'}).toArray((err, result) => {
    db.collection(cl_san_pham).aggregate([
      {
        $lookup: {
          from: 'loai_san_pham',
          localField: 'ma_loai',
          foreignField: '_id',
          as: 'loaisp'
        }
      }
    ]).toArray((err_sp,res_sp)=>{
      res.json({erroCode:0,hoa_don:result,san_pham:res_sp})
    })
  })
  
});

//đang ký
router.post('/dangky',async function(req, res, next) {
  let db = await xl_mongo.Get();
  var dk={'email':req.body.email,'chuc_vu':'khách hàng'}
  await db.collection(cl_nguoi_dung).find(dk).toArray((err,result)=>{
    if(result.length>0)
    {
      var kq={'errorCode':1, 'message':'Email đã tồn tại'}
      res.json(JSON.stringify(kq))
    }
    else
    {
      var user={
        'email':req.body.email,
        'ho_ten' : req.body.ho_ten,
        'dia_chi' : req.body.dia_chi,
        'password' : md5(req.body.password),
        'chuc_vu' : req.body.chuc_vu,
        'dien_thoai' : req.body.dien_thoai,
        'gioi_tinh' : req.body.gioi_tinh,
        'trang_thai' : 'đang hoạt động'
      }
      db.collection(cl_nguoi_dung).insert(user,(loi,ket_qua)=>{
        var from = "long4581994@gmail.com"
        var to = req.body.email
        var subject = "Đăng ký tài khoản thành công"
        var body = `Chào ${req.body.ho_ten}. Cảm ơn bạn đã đăng ký làm thành viên của Gear Store`
        var kqPromise = Gui_thu.Gioi_Thu_Lien_he(from, to, subject, body)
        kqPromise.then(r => {
        }).catch(err => {
          console.log(err);
        })
        var kq={
          'errorCode':0,
          'message':'Đăng ký thành công',
        }
        res.json(JSON.stringify(kq))
      })
    }
    
  })
});

//dang sách nhân viên
router.get('/nhan-vien',async function(req, res, next) {
  let db = await xl_mongo.Get();
  await db.collection(cl_nguoi_dung).find({'chuc_vu':'nhân viên'}).toArray((err,result)=>{
    if (result.length == 0) {
      var kq = {
        'errorCode': 1,
        'message': 'Không tìm thấy'
      }
      res.json(kq)
    }
    else {
      var kq = {
        'errorCode': 0,
        'data':result
      }
      res.json(kq)
    }
  })
});

//thêm nhân viên
router.post('/them-nhan-vien',async function(req, res, next) {
  let db = await xl_mongo.Get();
  var dk={'email':req.body.email,'chuc_vu':'nhân viên'}
  await db.collection(cl_nguoi_dung).find(dk).toArray((err,result)=>{
    if(result.length>0)
    {
      var kq={'errorCode':1, 'message':'Email đã tồn tại'}
      res.json(JSON.stringify(kq))
    }
    else
    {
      var user={
        'email':req.body.email,
        'ho_ten' : req.body.ho_ten,
        'dia_chi' : req.body.dia_chi,
        'password' : md5(req.body.password),
        'chuc_vu' : 'nhân viên',
        'dien_thoai' : req.body.dien_thoai,
        'gioi_tinh' : req.body.gioi_tinh,
        'trang_thai' : req.body.trang_thai
      }
      db.collection(cl_nguoi_dung).insert(user,(loi,ket_qua)=>{
        var kq={
          'errorCode':0,
          'message':'Thêm thành công',
        }
        res.json(JSON.stringify(kq))
      })
    }
    
  })
});

module.exports = router;