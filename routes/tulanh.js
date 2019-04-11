var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'
router.get('/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_tulanh=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/tulanh/samsung">
        SAMSUNG
      </a>
    </li>
    <li class="inactive">
      <a href="/tulanh/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="inactive">
      <a href="/tulanh/panasonic">
          PANASONIC
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b"),trang_thai:'kinh doanh'}).toArray((err,tulanh)=>{
    res.render('sanpham',{tieude:'Gear Srore | Tủ lạnh',trangthai:'Tủ lạnh',sanpham:JSON.stringify(tulanh),thumuc:'tulanh',sublist_tulanh:sublist_tulanh});
  });
});

router.get('/samsung/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_tulanh=`
  <ul class="sublist">
    <li class="active last">
      <a href="/tulanh/samsung">
        SAMSUNG
      </a>
    </li>
    <li class="inactive">
      <a href="/tulanh/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="inactive">
      <a href="/tulanh/panasonic">
          PANASONIC
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b"),ma_thuong_hieu:ObjectId("5bd11b2a088ca72064cc2c2d"),trang_thai:'kinh doanh'}).toArray((err,tulanh)=>{
    res.render('sanpham',{tieude:'Gear Srore | Tủ Lạnh SamSung',trangthai:'Tủ Lạnh / SAMSUNG',sanpham:JSON.stringify(tulanh),thumuc:'tulanh',sublist_tulanh:sublist_tulanh});
  });
});

router.get('/toshiba/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_tulanh=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/tulanh/samsung">
        SAMSUNG
      </a>
    </li>
    <li class="active last">
      <a href="/tulanh/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="inactive">
      <a href="/tulanh/panasonic">
          PANASONIC
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b"),ma_thuong_hieu:ObjectId("5be90ab7c4741b03ecfa6229"),trang_thai:'kinh doanh'}).toArray((err,tulanh)=>{
    res.render('sanpham',{tieude:'Gear Srore | Tủ Lạnh Toshiba',trangthai:'Tủ Lạnh / Toshiba',sanpham:JSON.stringify(tulanh),thumuc:'tulanh',sublist_tulanh:sublist_tulanh});
  });
});

router.get('/panasonic/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_tulanh=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/tulanh/samsung">
        SAMSUNG
      </a>
    </li>
    <li class="inactive">
      <a href="/tulanh/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="active last">
      <a href="/tulanh/panasonic">
          PANASONIC
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b"),ma_thuong_hieu:ObjectId("5be90aabc4741b03ecfa6228"),trang_thai:'kinh doanh'}).toArray((err,tulanh)=>{
    res.render('sanpham',{tieude:'Gear Srore | Tủ Lạnh Panasonic',trangthai:'Tủ Lạnh / Panasonic',sanpham:JSON.stringify(tulanh),thumuc:'tulanh',sublist_tulanh:sublist_tulanh});
  });

});

module.exports = router;
