var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'

router.get('/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32")}).toArray((err,maylanh)=>{
    res.render('sanpham',{tieude:'Máy Lạnh',trangthai:'Máy lạnh',sanpham:maylanh,thumuc:'maylanh'});
  });
});

router.get('/lg/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5bd11b46088ca72064cc2c2e")}).toArray((err,maylanh)=>{
    res.render('sanpham',{tieude:'Máy Lạnh LG',trangthai:'Máy lạnh/ LG',sanpham:maylanh,thumuc:'maylanh'});
  });

});

router.get('/toshiba/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5be90ab7c4741b03ecfa6229")}).toArray((err,maylanh)=>{
    res.render('sanpham',{tieude:'Máy Lạnh Toshiba',trangthai:'Máy lạnh / Toshiba',sanpham:maylanh,thumuc:'maylanh'});
  });

});

router.get('/panasonic/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5be90aabc4741b03ecfa6228")}).toArray((err,maylanh)=>{
    res.render('sanpham',{tieude:'Máy Lạnh Panasonic',trangthai:'Máy lạnh / Panasonic',sanpham:maylanh,thumuc:'maylanh'});
  });

});

router.get('/hitachi/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5be90a75c4741b03ecfa6225")}).toArray((err,maylanh)=>{
    res.render('sanpham',{tieude:'Máy Lạnh Hitachi',trangthai:'Máy lạnh / Hitachi',sanpham:maylanh,thumuc:'maylanh'});
  });

});

module.exports = router;
