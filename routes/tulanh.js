var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'
router.get('/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b")}).toArray((err,tulanh)=>{
    res.render('sanpham',{tieude:'Tủ lạnh',trangthai:'Tủ lạnh',sanpham:tulanh,thumuc:'tulanh'});
  });
});

router.get('/samsung/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b"),ma_thuong_hieu:ObjectId("5bd11b2a088ca72064cc2c2d")}).toArray((err,tulanh)=>{
    res.render('sanpham',{tieude:'Tủ Lạnh SamSung',trangthai:'Tủ Lạnh/ SAMSUNG',sanpham:tulanh,thumuc:'tulanh'});
  });
});

router.get('/toshiba/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b"),ma_thuong_hieu:ObjectId("5be90ab7c4741b03ecfa6229")}).toArray((err,tulanh)=>{
    res.render('sanpham',{tieude:'Tủ Lạnh Toshiba',trangthai:'Tủ Lạnh / Toshiba',sanpham:tulanh,thumuc:'tulanh'});
  });
});

router.get('/panasonic/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b"),ma_thuong_hieu:ObjectId("5be90aabc4741b03ecfa6228")}).toArray((err,tulanh)=>{
    res.render('sanpham',{tieude:'Tủ Lạnh Panasonic',trangthai:'Tủ Lạnh / Panasonic',sanpham:tulanh,thumuc:'tulanh'});
  });

});

module.exports = router;
