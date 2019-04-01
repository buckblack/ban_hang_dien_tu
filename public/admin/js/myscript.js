function check_ghichu() {
    var kq = document.querySelectorAll('.table_ghichu')
    var check = document.getElementById('check_ghichu')
    check.onchange = function () {
        if (check.checked == false)
            for (var i = 0; i < kq.length; i++) {
                kq[i].classList.add("d-none");
            }
        else
            for (var i = 0; i < kq.length; i++) {
                kq[i].classList.remove("d-none");
            }
    }
}






function check_ban() {
    var kq = document.querySelectorAll('.table_ban')
    var check = document.getElementById('check_ban')
    check.onchange = () => {

        if (check.checked == false)
            for (var i = 0; i < kq.length; i++) {
                kq[i].classList.add("d-none");
            }
        else
            for (var i = 0; i < kq.length; i++) {
                kq[i].classList.remove("d-none");
            }
    }


};

function check_img() {
    var kq = document.querySelectorAll('.table_hinh')
    var check = document.getElementById('check_img')
    check.onchange = () => {

        if (check.checked == false)
            for (var i = 0; i < kq.length; i++) {
                kq[i].classList.add("d-none");
            }
        else
            for (var i = 0; i < kq.length; i++) {
                kq[i].classList.remove("d-none");
            }
    }
};

function check_status() {
    var kq = document.querySelectorAll('.table_status')
    var check = document.getElementById('check_status')
    check.onchange = () => {

        if (check.checked == false)
            for (var i = 0; i < kq.length; i++) {
                kq[i].classList.add("d-none");
            }
        else
            for (var i = 0; i < kq.length; i++) {
                kq[i].classList.remove("d-none");
            }
    }
};


function cap_nhat_san_pham() {
    $('#btn_capnhat').click(function (e) {
        btn_close_detai.click()
    });

}

function thongtinsp(masp,image) {

    modaldetail.innerHTML = `
    <div class="h3 text-primary">Sản phẩm ABC</div>
    <div class="row">
        <div class="col-sm-3">
            <img src="${image}" class="img-fluid w-100" alt="" onclick="loadhinh('${image}')" data-toggle="modal" data-target="#modal-loadhinh" >
        </div>
        <div class="col-sm-4">
            <table class="table">
                <tbody>
                    <tr>
                        <td>Mã hàng hóa:</td>
                        <td><strong>SP${masp}</strong></td>
                    </tr>
                    <tr>
                        <td>Tên hàng hóa:</td>
                        <td><strong>Sản phẩm ABC</strong></td>
                    </tr>
                    <tr>
                        <td>Loại hàng:</td>
                        <td><strong>Khác</strong></td>
                    </tr>
                    <tr>
                        <td>Số lượng:</td>
                        <td><strong>10</strong></td>
                    </tr>
                    <tr>
                        <td>Giá bán:</td>
                        <td><strong>30,000</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-5">
            <table class="table">
                <tbody>
                    <tr>
                        <td>Tình trạng:</td>
                        <td><strong>Cho phép kinh doanh</strong></td>
                    </tr>
                    <tr>
                        <td>Mô tả:</td>
                        <td>kajfd ak gra grfkjgfkasgf uai giua gfuodf gouadgf </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="row float-right form-inline">
        <ul class="nav nav-pills nav-fill m-3">
                <li class="nav-item" id="btn_capnhat" onclick="capnhatsp()" data-dismiss="modal" data-toggle="modal" data-target="#modal-update">
                    <a class="nav-link btn btn-success btn-lg mx-2 mt-2" href="#" 
                        ><i class="fa fa-check-circle-o"></i> Cập nhật</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link btn btn-danger btn-lg mx-2 mt-2" href="#"><i class=" fa fa-trash-o"></i> Xóa</a>
                </li>
            </ul>
    </div>
    `
}

function capnhatsp(masp) {
    modalupdate.innerHTML = `
    <div class="form-group">
        <label>Tên sản phẩm</label>
        <input type="text" class="form-control" placeholder="Nhập tên sản phẩm mới">
    </div>
    <div class="form-group">
        <label>Loại sản phẩm</label>
        <select class="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
    </div>
    <div class="form-group">
        <label>Đơn giá</label>
        <input type="number" class="form-control" placeholder="Nhập tên sản phẩm mới">
    </div>
    <div class="form-group">
        <label>Thương hiệu</label>
        <select class="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
    </div>
    <div class="form-group">
        <label>Hình ảnh</label>
        <input type="file" class="form-control-file">
    </div>
    <label>Mô tả</label>
    <textarea name="binh_luan" id="binh_luan2" class="ckeditor"></textarea>
    `
    CKEDITOR.replace('binh_luan2', {
        customConfig: 'config_binh_luan.js'
    });
}

function loadhinh(image)
{
    dia_chi_img.innerHTML=`<img src="${image}" class="w-100">`
}

function xoa_gio_hang(mahd,mamon,soluong)
{
    var kq=document.getElementById('tr_gio_hang_'+mahd);
    kq.innerHTML=``;    
}

function doi_so_luong_gio_hang(mahd)
{
    var soluong=document.getElementById('soluong_'+mahd);
    var tien=document.getElementById('tongtien_'+mahd);
    var gia=document.getElementById('gia_'+mahd);
    tien.innerHTML=Number(soluong.value)*Number(gia.innerHTML);
}