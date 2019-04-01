var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
var thuonghieuSchema = new Schema({
  hinh: String,
});
module.exports = mongoose.model('thuong_hieu', thuonghieuSchema,'thuong_hieu');
