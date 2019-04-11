var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'
router.get('/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_maygiat=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/maygiat/lg">
          LG
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/aqua">
          AQUA
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/samsung">
        SAMSUNG
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11bb9088ca72064cc2c33"),trang_thai:'kinh doanh'}).toArray((err,maygiat)=>{
    res.render('sanpham',{tieude:'Gear Srore | Máy giặt',trangthai:'Máy giặt',sanpham:JSON.stringify(maygiat),thumuc:'maygiat',sublist_maygiat:sublist_maygiat});
  });
});

router.get('/samsung/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_maygiat=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/maygiat/lg">
          LG
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/aqua">
          AQUA
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="active last">
      <a href="/maygiat/samsung">
        SAMSUNG
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11bb9088ca72064cc2c33"),ma_thuong_hieu:ObjectId("5bd11b2a088ca72064cc2c2d"),trang_thai:'kinh doanh'}).toArray((err,maygiat)=>{
    res.render('sanpham',{tieude:'Gear Srore | Máy giặt SamSung',trangthai:'Máy giặt / SAMSUNG',sanpham:JSON.stringify(maygiat),thumuc:'maygiat',sublist_maygiat:sublist_maygiat});
  });
});

router.get('/lg/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_maygiat=`
  <ul class="sublist">
    <li class="active last">
      <a href="/maygiat/lg">
          LG
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/aqua">
          AQUA
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/samsung">
        SAMSUNG
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11bb9088ca72064cc2c33"),ma_thuong_hieu:ObjectId("5bd11b46088ca72064cc2c2e"),trang_thai:'kinh doanh'}).toArray((err,maygiat)=>{
    res.render('sanpham',{tieude:'Gear Srore | Máy giặt SamSung',trangthai:'Máy giặt / LG',sanpham:JSON.stringify(maygiat),thumuc:'maygiat',sublist_maygiat:sublist_maygiat});
  });
});

router.get('/toshiba/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_maygiat=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/maygiat/lg">
          LG
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/aqua">
          AQUA
      </a>
    </li>
    <li class="active last">
      <a href="/maygiat/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/samsung">
        SAMSUNG
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11bb9088ca72064cc2c33"),ma_thuong_hieu:ObjectId("5be90ab7c4741b03ecfa6229"),trang_thai:'kinh doanh'}).toArray((err,maygiat)=>{
    res.render('sanpham',{tieude:'Gear Srore | Máy giặt Toshiba',trangthai:'Máy giặt / Toshiba',sanpham:JSON.stringify(maygiat),thumuc:'maygiat',sublist_maygiat:sublist_maygiat});
  });
});

router.get('/aqua/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_maygiat=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/maygiat/lg">
          LG
      </a>
    </li>
    <li class="active last">
      <a href="/maygiat/aqua">
          AQUA
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="inactive">
      <a href="/maygiat/samsung">
        SAMSUNG
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11bb9088ca72064cc2c33"),ma_thuong_hieu:ObjectId("5be90a55c4741b03ecfa6222"),trang_thai:'kinh doanh'}).toArray((err,maygiat)=>{
    res.render('sanpham',{tieude:'Gear Srore | Máy giặt Panasonic',trangthai:'Máy giặt / Aqua',sanpham:JSON.stringify(maygiat),thumuc:'maygiat',sublist_maygiat:sublist_maygiat});
  });

});

module.exports = router;
