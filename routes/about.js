var express = require('express');
var router = express.Router();
var xl_mongo = require('../public/js/KET_NOI')
var Gui_thu = require("../public/js/xl_gui_thu")
cl_lien_he ='lien_he'

router.get('/lienhe', function(req, res, next) {
  res.render('lienhe', { tieude: 'Gear Srore | Liên hệ',trangthai:"Liên hệ" });
});

router.post('/lienhe',async function(req, res, next) {
  let db = await xl_mongo.Get();
  var lh=JSON.parse(req.body.lien_he)
  db.collection(cl_lien_he).insert(lh,()=>{
    var from = "long4581994@gmail.com"
    var to = lh.email
    var subject = "Gửi liên hệ"
    var body = `Chào ${lh.ho_ten}. Cảm ơn bạn đã gửi liên lạc đến Gear Store`
    var kqPromise = Gui_thu.Gioi_Thu_Lien_he(from, to, subject, body)
    kqPromise.then(r => {
    }).catch(err => {
      console.log(err);
    })
    res.json({errorCode:0,message:'Gửi thành công'})
  }) 
});

module.exports = router;
