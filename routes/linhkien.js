var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'
router.get('/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_linhkien=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/linhkien/tainghecoday">
          Tai nghe có dây
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/tainghekhongday">
          Tai nghe không dây
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/pinduphong">
          Pin sạc dự phòng
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/capsac">
        Dây, cáp sạc
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({$or:
    [{ma_loai:ObjectId("5be914ebc4741b03ecfa622e")},
    {ma_loai:ObjectId("5caa002c363af108fc00ea8a")},
    {ma_loai:ObjectId("5caa006a363af108fc00ea8c")},
    {ma_loai:ObjectId("5caa0052363af108fc00ea8b")}
    ],trang_thai:'kinh doanh'}).toArray((err,linhkien)=>{
    res.render('sanpham',{tieude:'Gear Srore | Linh kiện',trangthai:'Linh kiện',sanpham:JSON.stringify(linhkien),thumuc:'phukien',sublist_linhkien:sublist_linhkien});
  });
});

router.get('/tainghecoday/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_linhkien=`
  <ul class="sublist">
    <li class="active last">
      <a href="/linhkien/tainghecoday">
          Tai nghe có dây
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/tainghekhongday">
          Tai nghe không dây
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/pinduphong">
          Pin sạc dự phòng
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/capsac">
        Dây, cáp sạc
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914ebc4741b03ecfa622e"),trang_thai:'kinh doanh'}).toArray((err,linhkien)=>{
    res.render('sanpham',{tieude:'Gear Srore | Tai nghe có dây',trangthai:'Linh kiện / Tai nghe có dây',sanpham:JSON.stringify(linhkien),thumuc:'phukien',sublist_linhkien:sublist_linhkien});
  });
});

router.get('/tainghekhongday/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_linhkien=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/linhkien/tainghecoday">
          Tai nghe có dây
      </a>
    </li>
    <li class="active last">
      <a href="/linhkien/tainghekhongday">
          Tai nghe không dây
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/pinduphong">
          Pin sạc dự phòng
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/capsac">
        Dây, cáp sạc
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5caa002c363af108fc00ea8a"),trang_thai:'kinh doanh'}).toArray((err,linhkien)=>{
    res.render('sanpham',{tieude:'Gear Srore | Tai nghe không dây',trangthai:'Linh kiện / Tai nghe không dây',sanpham:JSON.stringify(linhkien),thumuc:'phukien',sublist_linhkien:sublist_linhkien});
  });
});

router.get('/pinduphong/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_linhkien=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/linhkien/tainghecoday">
          Tai nghe có dây
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/tainghekhongday">
          Tai nghe không dây
      </a>
    </li>
    <li class="active last">
      <a href="/linhkien/pinduphong">
          Pin sạc dự phòng
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/capsac">
        Dây, cáp sạc
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5caa006a363af108fc00ea8c"),trang_thai:'kinh doanh'}).toArray((err,linhkien)=>{
    res.render('sanpham',{tieude:'Gear Srore | Pin sạc dự phòng',trangthai:'Linh kiện / Pin sạc dự phòng',sanpham:JSON.stringify(linhkien),thumuc:'phukien',sublist_linhkien:sublist_linhkien});
  });
});

router.get('/capsac/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_linhkien=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/linhkien/tainghecoday">
          Tai nghe có dây
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/tainghekhongday">
          Tai nghe không dây
      </a>
    </li>
    <li class="inactive">
      <a href="/linhkien/pinduphong">
          Pin sạc dự phòng
      </a>
    </li>
    <li class="active last">
      <a href="/linhkien/capsac">
        Dây, cáp sạc
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5caa0052363af108fc00ea8b"),trang_thai:'kinh doanh'}).toArray((err,linhkien)=>{
    res.render('sanpham',{tieude:'Gear Srore | Dây, cáp sạc',trangthai:'Linh kiện / Dây, cáp sạc',sanpham:JSON.stringify(linhkien),thumuc:'phukien',sublist_linhkien:sublist_linhkien});
  });

});

module.exports = router;
