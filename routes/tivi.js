var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
cl_san_pham='san_pham'
router.get('/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_tivi=`
    <ul class="sublist">
        <li class="inactive">
            <a href="/tivi/samsung">
                SAMSUNG
            </a>
        </li>

        <li class="inactive">
            <a href="/tivi/sony">
                SONY
            </a>
        </li>

        <li class="inactive">
            <a href="/tivi/lg">
                LG
            </a>
        </li>
    </ul>
  `
  await db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30"),trang_thai:'kinh doanh'}).toArray((err,tivi)=>{
    res.render('sanpham',{tieude:'Gear Srore | TiVi',trangthai:'Tivi',sanpham:JSON.stringify(tivi),thumuc:'tivi',sublist_tivi:sublist_tivi});
    //res.json({'thu_muc':'tivi','data':tivi});
  });

});

router.get('/samsung/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_tivi=`
  <ul class="sublist">
    <li class="active last">
      <a href="/tivi/samsung">
        SAMSUNG
      </a>
    </li>
    <li class="inactive">
      <a href="/tivi/sony">
          SONY
      </a>
    </li>
    <li class="inactive">
      <a href="/tivi/lg">
          LG
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30"),ma_thuong_hieu:ObjectId("5bd11b2a088ca72064cc2c2d"),trang_thai:'kinh doanh'}).toArray((err,tivi)=>{
    console.log(req.Nguoi_dung);
    
    res.render('sanpham',{tieude:'Gear Srore | TiVi SamSung',trangthai:'Tivi / SAMSUNG',sanpham:JSON.stringify(tivi),thumuc:'tivi',sublist_tivi:sublist_tivi});
  });

});

router.get('/sony/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_tivi=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/tivi/samsung">
        SAMSUNG
      </a>
    </li>
    <li class="active last">
      <a href="/tivi/sony">
          SONY
      </a>
    </li>
    <li class="inactive">
      <a href="/tivi/lg">
          LG
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30"),ma_thuong_hieu:ObjectId("5bd11b5a088ca72064cc2c2f"),trang_thai:'kinh doanh'}).toArray((err,tivi)=>{
    res.render('sanpham',{tieude:'Gear Srore | TiVi Sony',trangthai:'Tivi / SONY',sanpham:JSON.stringify(tivi),thumuc:'tivi',sublist_tivi:sublist_tivi});
  });

});

router.get('/lg/', async function(req, res, next) {
  let db = await xl_mongo.Get();
  var sublist_tivi=`
  <ul class="sublist">
    <li class="inactive">
      <a href="/tivi/samsung">
        SAMSUNG
      </a>
    </li>
    <li class="inactive">
      <a href="/tivi/sony">
          SONY
      </a>
    </li>
    <li class="active last">
      <a href="/tivi/lg">
          LG
      </a>
    </li>
  </ul>
  `
  db.collection(cl_san_pham).find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30"),ma_thuong_hieu:ObjectId("5bd11b46088ca72064cc2c2e"),trang_thai:'kinh doanh'}).toArray((err,tivi)=>{
    res.render('sanpham',{tieude:'Gear Srore | TiVi LG',trangthai:'Tivi / LG',sanpham:JSON.stringify(tivi),thumuc:'tivi',sublist_tivi:sublist_tivi});
  });

});

module.exports = router;
