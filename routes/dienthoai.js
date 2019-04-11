var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'
router.get('/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_dienthoai=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/dienthoai/iphone">
          IPHONE
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/samsung">
          SAMSUNG
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/oppo">
          OPPO
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/sony">
        SONY
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b9c088ca72064cc2c31"),trang_thai:'kinh doanh'}).toArray((err,dienthoai)=>{
    res.render('sanpham',{tieude:'Gear Srore | Điện thoại',trangthai:'Điện thoại',sanpham:JSON.stringify(dienthoai),thumuc:'dienthoai',sublist_dienthoai:sublist_dienthoai});
  });
});

router.get('/iphone/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_dienthoai=`
  <ul class="sublist">
    <li class="active last">
      <a href="/dienthoai/iphone">
          IPHONE
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/samsung">
          SAMSUNG
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/oppo">
          OPPO
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/sony">
        SONY
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b9c088ca72064cc2c31"),ma_thuong_hieu:ObjectId("5be90a47c4741b03ecfa6221"),trang_thai:'kinh doanh'}).toArray((err,dienthoai)=>{
    res.render('sanpham',{tieude:'Gear Srore | Điện thoại Iphone',trangthai:'Điện thoại / Iphone',sanpham:JSON.stringify(dienthoai),thumuc:'dienthoai',sublist_dienthoai:sublist_dienthoai});
  });
});

router.get('/samsung/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_dienthoai=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/dienthoai/iphone">
          IPHONE
      </a>
    </li>
    <li class="active last">
      <a href="/dienthoai/samsung">
          SAMSUNG
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/oppo">
          OPPO
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/sony">
        SONY
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b9c088ca72064cc2c31"),ma_thuong_hieu:ObjectId("5bd11b2a088ca72064cc2c2d"),trang_thai:'kinh doanh'}).toArray((err,dienthoai)=>{
    res.render('sanpham',{tieude:'Gear Srore | Điện thoại SamSung',trangthai:'Điện thoại / Samsung',sanpham:JSON.stringify(dienthoai),thumuc:'dienthoai',sublist_dienthoai:sublist_dienthoai});
  });
});

router.get('/oppo/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_dienthoai=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/dienthoai/iphone">
          IPHONE
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/samsung">
          SAMSUNG
      </a>
    </li>
    <li class="active last">
      <a href="/dienthoai/oppo">
          OPPO
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/sony">
        SONY
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b9c088ca72064cc2c31"),ma_thuong_hieu:ObjectId("5be90a88c4741b03ecfa6227"),trang_thai:'kinh doanh'}).toArray((err,dienthoai)=>{
    res.render('sanpham',{tieude:'Gear Srore | Điện thoại Oppo',trangthai:'Điện thoại / Oppo',sanpham:JSON.stringify(dienthoai),thumuc:'dienthoai',sublist_dienthoai:sublist_dienthoai});
  });
});

router.get('/sony/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_dienthoai=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/dienthoai/iphone">
          IPHONE
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/samsung">
          SAMSUNG
      </a>
    </li>
    <li class="inactive">
      <a href="/dienthoai/oppo">
          OPPO
      </a>
    </li>
    <li class="active last">
      <a href="/dienthoai/sony">
        SONY
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b9c088ca72064cc2c31"),ma_thuong_hieu:ObjectId("5bd11b5a088ca72064cc2c2f"),trang_thai:'kinh doanh'}).toArray((err,dienthoai)=>{
    res.render('sanpham',{tieude:'Gear Srore | Điện thoại Sony',trangthai:'Điện thoại / Sony',sanpham:JSON.stringify(dienthoai),thumuc:'dienthoai',sublist_dienthoai:sublist_dienthoai});
  });

});

module.exports = router;
