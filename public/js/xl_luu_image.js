
var File = require("fs")
var Duong_dan_Thu_muc_Media = "./public/images/"

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Lỗi ...');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}



class XL_hinh_anh {


  Doc_Nhi_phan_Media(Ten_Tap_tin,thu_muc) {
    var Nhi_phan = ""
    var Duong_dan = Duong_dan_Thu_muc_Media + "/"+ thu_muc + "/" + Ten_Tap_tin
    if (File.existsSync(Duong_dan))
      Nhi_phan = File.readFileSync(Duong_dan)
    return Nhi_phan

  }
  Ghi_Nhi_phan_Media(Ten, Chuoi_nhi_phan,thu_muc) {
    var Kq = ""
    try {
      var Nhi_phan = decodeBase64Image(Chuoi_nhi_phan);
      var Duong_dan = Duong_dan_Thu_muc_Media + "/"+ thu_muc + "/" + Ten
      File.writeFileSync(Duong_dan, Nhi_phan.data);
    } catch (Loi) {
      Kq = Loi.toString()
    }
    return Kq
  }

}

var Xu_ly = new XL_hinh_anh
module.exports = Xu_ly




