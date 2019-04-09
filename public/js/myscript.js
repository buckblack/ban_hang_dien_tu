function bo_dau(str) {
    str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str= str.replace(/đ/g,"d");
    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
    str= str.replace(/^\-+|\-+$/g,"");//cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str;
}

function diem_trung_binh(arr)
{
    if (arr.length==0) {
        return 100;
    }
    var diem=0;
    arr.forEach(row => {
        diem+=Number(row)
    });
    return (diem/arr.length)/5*100;
}

function kiem_tra_tim_kiem()
{
    var tim_kiem=document.getElementById("keyword")
    if(tim_kiem.value.trim()=="")
    {
        alert("Vui lòng nhập từ khoá tìm kiếm")
        tim_kiem.focus()
    }
    else
    {
        window.location='/tim-kiem/'+tim_kiem.value.trim()
    }
}
function kiem_tra_tim_kiem_footer()
{
    var tim_kiem=document.getElementById("keyword_footer")
    if(tim_kiem.value.trim()=="")
    {
        alert("Vui lòng nhập từ khoá tìm kiếm")
        tim_kiem.focus()
    }
    else
    {
        window.location='/tim-kiem/'+tim_kiem.value.trim()
    }
}
function kiem_tra_thong_tin_dang_ky()
{
    var ten_khach_hang=document.getElementById("dang_ky_ten_khach_hang")
    var dia_chi=document.getElementById("dang_ky_dia_chi")
    var dien_thoai=document.getElementById("dang_ky_dien_thoai")
    var ten_dang_nhap=document.getElementById("dang_ky_ten_dang_nhap")
    var email=document.getElementById("dang_ky_email")
    var mat_khau=document.getElementById("dang_ky_mat_khau")
    var nhap_lai_mat_khau=document.getElementById("dang_ky_nhap_lai_mat_khau")

    if(ten_khach_hang.value.trim()=="")
    {
        alert("Vui lòng nhập họ tên")
        ten_khach_hang.focus()
        return false
    }

    if(dia_chi.value.trim()=="")
    {
        alert("Vui lòng nhập địa chỉ")
        dia_chi.focus()
        return false
    }

    if(dien_thoai.value.trim()=="")
    {
        alert("Vui lòng nhập số diện thoại")
        dien_thoai.focus()
        return false
    }

    if(isNaN(dien_thoai.value) || (dien_thoai.value.length)>11)
    {
        alert("Số điện thoại không hợp lệ")
        dien_thoai.focus()
        return false
    }

    if(ten_dang_nhap.value.trim()=="")
    {
        alert("Vui lòng nhập tên đăng nhập")
        ten_dang_nhap.focus()
        return false
    }

    if(email.value.trim()=="")
    {
        alert("Vui lòng nhập email")
        email.focus()
        return false
    }

    if(mat_khau.value.trim()=="")
    {
        alert("Vui lòng nhập mật khẩu")
        mat_khau.focus()
        return false
    }

    if(nhap_lai_mat_khau.value.trim()!=mat_khau.value.trim())
    {
        alert("Mật khẩu không trùng khớp")
        nhap_lai_mat_khau.focus()
        return false
    }

    return true
}

function kiem_tra_thong_tin_dang_nhap()
{
    var ten_dang_nhap=document.getElementById("dang_nhap_email")
    var mat_khau=document.getElementById("dang_nhap_mat_khau")
    if(ten_dang_nhap.value.trim()=="")
    {
        alert("Vui lòng nhập tên đăng nhập")
        ten_dang_nhap.focus()
        return false
    }
    if(mat_khau.value.trim()=="")
    {
        alert("Vui lòng nhập mật khẩu")
        mat_khau.focus()
        return false
    }

    return true
} 

