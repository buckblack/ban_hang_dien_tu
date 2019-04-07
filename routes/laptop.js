var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'
router.get('/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_laptop=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/laptop/apple">
          Apple
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/dell">
          Dell
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/asus">
          Asus
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/msi">
        MSI
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914d6c4741b03ecfa622c")}).toArray((err,laptop)=>{
    res.render('sanpham',{tieude:'Gear Srore | Laptop',trangthai:'Laptop',sanpham:JSON.stringify(laptop),thumuc:'laptop',sublist_laptop:sublist_laptop});
  });
});

router.get('/apple/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_laptop=`
  <ul class="sublist">
    <li class="active last">
      <a href="/laptop/apple">
          Apple
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/dell">
          Dell
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/asus">
          Asus
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/msi">
        MSI
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914d6c4741b03ecfa622c"),ma_thuong_hieu:ObjectId("5be90a47c4741b03ecfa6221")}).toArray((err,laptop)=>{
    res.render('sanpham',{tieude:'Gear Srore | Laptop Apple',trangthai:'Laptop / Apple',sanpham:JSON.stringify(laptop),thumuc:'laptop',sublist_laptop:sublist_laptop});
  });
});

router.get('/dell/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_laptop=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/laptop/apple">
          Apple
      </a>
    </li>
    <li class="active last">
      <a href="/laptop/dell">
          Dell
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/asus">
          Asus
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/msi">
        MSI
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914d6c4741b03ecfa622c"),ma_thuong_hieu:ObjectId("5be90a6dc4741b03ecfa6224")}).toArray((err,laptop)=>{
    res.render('sanpham',{tieude:'Gear Srore | Laptop Dell',trangthai:'Laptop / Dell',sanpham:JSON.stringify(laptop),thumuc:'laptop',sublist_laptop:sublist_laptop});
  });
});

router.get('/asus/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_laptop=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/laptop/apple">
          Apple
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/dell">
          Dell
      </a>
    </li>
    <li class="active last">
      <a href="/laptop/asus">
          Asus
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/msi">
        MSI
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914d6c4741b03ecfa622c"),ma_thuong_hieu:ObjectId("5be90a64c4741b03ecfa6223")}).toArray((err,laptop)=>{
    res.render('sanpham',{tieude:'Gear Srore | Laptop Asus',trangthai:'Laptop / Asus',sanpham:JSON.stringify(laptop),thumuc:'laptop',sublist_laptop:sublist_laptop});
  });
});

router.get('/msi/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_laptop=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/laptop/apple">
          Apple
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/dell">
          Dell
      </a>
    </li>
    <li class="inactive">
      <a href="/laptop/asus">
          Asus
      </a>
    </li>
    <li class="active last">
      <a href="/laptop/msi">
        MSI
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5be914d6c4741b03ecfa622c"),ma_thuong_hieu:ObjectId("5be90a82c4741b03ecfa6226")}).toArray((err,laptop)=>{
    res.render('sanpham',{tieude:'Gear Srore | Laptop MSI',trangthai:'Laptop / MSI',sanpham:JSON.stringify(laptop),thumuc:'laptop',sublist_laptop:sublist_laptop});
  });

});

module.exports = router;
