var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'

router.get('/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_maylanh=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/maylanh/lg">
        LG
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/panasonic">
          PANASONIC
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/hitachi">
          HITACHI
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32")}).toArray((err,maylanh)=>{
    res.render('sanpham',{tieude:'Gear Srore | Máy Lạnh',trangthai:'Máy lạnh',sanpham:JSON.stringify(maylanh),thumuc:'maylanh',sublist_maylanh:sublist_maylanh});
  });
});

router.get('/lg/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_maylanh=`
  <ul class="sublist">
    <li class="active last">
      <a href="/maylanh/lg">
        LG
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/panasonic">
          PANASONIC
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/hitachi">
          HITACHI
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5bd11b46088ca72064cc2c2e")}).toArray((err,maylanh)=>{
    res.render('sanpham',{tieude:'Gear Srore | Máy Lạnh LG',trangthai:'Máy lạnh/ LG',sanpham:JSON.stringify(maylanh),thumuc:'maylanh',sublist_maylanh:sublist_maylanh});
  });

});

router.get('/toshiba/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_maylanh=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/maylanh/lg">
        LG
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/panasonic">
          PANASONIC
      </a>
    </li>
    <li class="active last">
      <a href="/maylanh/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/hitachi">
          HITACHI
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5be90ab7c4741b03ecfa6229")}).toArray((err,maylanh)=>{
    res.render('sanpham',{tieude:'Gear Srore | Máy Lạnh Toshiba',trangthai:'Máy lạnh / Toshiba',sanpham:JSON.stringify(maylanh),thumuc:'maylanh',sublist_maylanh:sublist_maylanh});
  });

});

router.get('/panasonic/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_maylanh=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/maylanh/lg">
        LG
      </a>
    </li>
    <li class="active last">
      <a href="/maylanh/panasonic">
          PANASONIC
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/hitachi">
          HITACHI
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5be90aabc4741b03ecfa6228")}).toArray((err,maylanh)=>{
    res.render('sanpham',{tieude:'Gear Srore | Máy Lạnh Panasonic',trangthai:'Máy lạnh / Panasonic',sanpham:JSON.stringify(maylanh),thumuc:'maylanh',sublist_maylanh:sublist_maylanh});
  });

});

router.get('/hitachi/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_maylanh=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/maylanh/lg">
        LG
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/panasonic">
          PANASONIC
      </a>
    </li>
    <li class="inactive">
      <a href="/maylanh/toshiba">
          TOSHIBA
      </a>
    </li>
    <li class="active last">
      <a href="/maylanh/hitachi">
          HITACHI
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5be90a75c4741b03ecfa6225")}).toArray((err,maylanh)=>{
    res.render('sanpham',{tieude:'Gear Srore | Máy Lạnh Hitachi',trangthai:'Máy lạnh / Hitachi',sanpham:JSON.stringify(maylanh),thumuc:'maylanh',sublist_maylanh:sublist_maylanh});
  });

});

module.exports = router;
