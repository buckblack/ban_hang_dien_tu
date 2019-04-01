var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'
router.get('/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30")}).toArray((err,tivi)=>{
    res.render('sanpham',{tieude:'TiVi',trangthai:'Tivi',sanpham:tivi,thumuc:'tivi'});
  });

});

router.get('/samsung/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30"),ma_thuong_hieu:ObjectId("5bd11b2a088ca72064cc2c2d")}).toArray((err,tivi)=>{
    console.log(req.Nguoi_dung);
    
    res.render('sanpham',{tieude:'TiVi SamSung',trangthai:'Tivi / SAMSUNG',sanpham:tivi,thumuc:'tivi'});
  });

});

router.get('/sony/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30"),ma_thuong_hieu:ObjectId("5bd11b5a088ca72064cc2c2f")}).toArray((err,tivi)=>{
    res.render('sanpham',{tieude:'TiVi Sony',trangthai:'Tivi / SONY',sanpham:tivi,thumuc:'tivi'});
  });

});

router.get('/lg/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30"),ma_thuong_hieu:ObjectId("5bd11b46088ca72064cc2c2e")}).toArray((err,tivi)=>{
    res.render('sanpham',{tieude:'TiVi LG',trangthai:'Tivi / LG',sanpham:tivi,thumuc:'tivi'});
  });

});

module.exports = router;
