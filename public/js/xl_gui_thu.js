var nodemailer = require('nodemailer')
class XL_GOI_THU_DIEN_TU {
    Gioi_Thu_Lien_he(from, to, subject, body){
        var transporter =nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'long4581994@gmail.com',
                pass:'khoa1234'
            }
        });
        var mailOptios={
            from:`GearStore <${from}>`,
            to: to,
            subject : subject,
            html: body
        };
        //gọi phương thức send mail->Promise
        return transporter.sendMail(mailOptios);
    }
}
var Goi_thu =new XL_GOI_THU_DIEN_TU()
module.exports=Goi_thu