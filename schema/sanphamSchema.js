var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
var sanphamSchema = new Schema({
  ten_sp: String,
  ma_thuong_hieu: ObjectId,
  ma_loai: ObjectId,
  gia_ban: Number,
  bao_hanh: Number,
  so_luong: Number,
  hot: Number,
  hinh_anh: String,
  xoa: Number
});
module.exports = mongoose.model('san_pham', sanphamSchema,'san_pham');

