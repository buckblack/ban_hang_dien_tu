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

function thongtinsp(masp, image) {
    $.ajax({
        url: window.location.origin + '/tim-kiem/gio-hang/' + masp,
        type: "GET",
        success: (data) => {
            var kq = JSON.parse(data)[0]
            modaldetail.innerHTML = `
            <div class="h3 text-primary"></div>
            <div class="row">
                <div class="col-sm-3">
                    <img src="${image}" class="img-fluid w-100" alt="" onclick="loadhinh('${image}')" data-toggle="modal" data-target="#modal-loadhinh" >
                </div>
                <div class="col-sm-4">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Mã:</td>
                                <td><strong>${masp}</strong></td>
                            </tr>
                            
                            <tr>
                                <td>Số lượng:</td>
                                <td><strong>${kq.so_luong}</strong></td>
                            </tr>
                            <tr>
                                <td>Giá bán:</td>
                                <td><strong>${kq.gia_ban.toLocaleString('en-GB')}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-sm-5">
                    <table class="table">
                        <tbody>
                        <tr>
                                <td>Tên:</td>
                                <td><strong>${kq.ten_sp}</strong></td>
                            </tr>
                            <tr>
                                <td>Loại:</td>
                                <td><strong>${kq.loaisp[0].ten_loai}</strong></td>
                            </tr>
                            <tr>
                                <td>Tình trạng:</td>
                                <td><strong>${kq.trang_thai}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-sm-12">
                    <p>Mô tả:</p>
                    ${kq.noi_dung}
                </div>
            </div>
            <div class="row float-right form-inline">
                <ul class="nav nav-pills nav-fill m-3">
                        <li class="nav-item" id="btn_capnhat" onclick="capnhatsp('${kq._id}')" data-dismiss="modal" data-toggle="modal" data-target="#modal-update">
                            <a class="nav-link btn btn-success btn-lg mx-2 mt-2" href="#" 
                                ><i class="fa fa-check-circle-o"></i> Cập nhật</a>
                        </li>
                    </ul>
            </div>
            `
        }
    })

}

function capnhatsp(masp) {
    $.ajax({
        url: window.location.origin + '/admin/cap-nhap-san-pham/'+masp,
        type: "GET",
        success: (data) => {
            var kq = JSON.parse(data)
            console.log(kq);
            var TH=``
            kq.thuong_hieu.forEach(row => {
                TH+=`
                <option value="${row._id}" ${kq.san_pham.ma_thuong_hieu==row._id?'selected':''}>${row.ten_thuong_hieu}</option>
                `
            })
            loai=``
            kq.loai_san_pham.forEach(row => {
                loai+=`
                <option value="${row._id}__${row.thu_muc_hinh}" ${kq.san_pham.ma_loai==row._id?'selected':''}>${row.ten_loai}</option>
                `
            })
            modalupdate.innerHTML = `
            <div class="form-group">
                <label>Tên sản phẩm</label>
                <input type="text" id="cn_ten_sp" class="form-control" value="${kq.san_pham.ten_sp}" placeholder="Nhập tên sản phẩm mới">
                <input type="hidden" id="cn_id_sp" value="${kq.san_pham._id}">
            </div>
            <div class="form-group">
                <label>Loại sản phẩm</label>
                <select class="form-control" id="cn_loai_sp">
                    ${loai}
                </select>
            </div>
            <div class="form-group">
                <label>Tình trạng</label>
                <select class="form-control" id="cn_trang_thai">
                    <option value="kinh doanh" ${kq.san_pham.trang_thai=='kinh doanh'?'selected':''}>kinh doanh</option>
                    <option value="ngừng kinh doanh" ${kq.san_pham.trang_thai=='ngừng kinh doanh'?'selected':''}>ngừng kinh doanh</option>
                </select>
            </div>
            <div class="form-group">
                <label>Thương hiệu</label>
                <select class="form-control" id="cn_thuong_hieu">
                    ${TH}
                </select>
            </div>
            <div class="form-group">
                <label>Đơn giá</label>
                <input type="number" id="cn_gia_ban" class="form-control" value="${kq.san_pham.gia_ban}" placeholder="Nhập tên sản phẩm mới">
            </div>
            <div class="form-group">
                <label>Bảo hành</label>
                <input type="number" id="cn_bao_hanh" value="${kq.san_pham.bao_hanh}" class="form-control" placeholder="Nhập thời gian bảo hành (tháng)">
            </div>
            <div class="form-check form-check-inline">
                <legend class="mr-2">Cập nhật hình ảnh: </legend>
                <input class="form-check-input" type="radio" name="file" id="file1" value="co">
                <label class="form-check-label" >Có</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="file" id="file2" value="khong" checked>
                <label class="form-check-label">Không</label>
            </div>
            <div class="form-group">
                <label>Hình ảnh</label>
                <input type="file" name="file_hinh" id="file_hinh" disabled class="form-control-file">
            </div>
            <label>Mô tả</label>
            <textarea name="binh_luan" id="binh_luan2" class="ckeditor">${kq.san_pham.noi_dung}</textarea>
            `
            CKEDITOR.replace('binh_luan2', {
                customConfig: 'config_binh_luan.js'
            });
            file1.onclick = () => {
                if (file1.checked == true)
                    file_hinh.removeAttribute("disabled")
                else
                    file_hinh.setAttribute("disabled", "")
            }
            file2.onclick = () => {
                if (file2.checked == true)
                    file_hinh.setAttribute("disabled", "")
                else
                    file_hinh.removeAttribute("disabled")
            }
        }
    })
    
}

function loadhinh(image) {
    dia_chi_img.innerHTML = `<img src="${image}" class="w-100">`
}

function xoa_gio_hang(mahd, mamon, soluong) {
    var kq = document.getElementById('tr_gio_hang_' + mahd);
    kq.innerHTML = ``;
}

function doi_so_luong_gio_hang(mahd) {
    var soluong = document.getElementById('soluong_' + mahd);
    var tien = document.getElementById('tongtien_' + mahd);
    var gia = document.getElementById('gia_' + mahd);
    tien.innerHTML = Number(soluong.value) * Number(gia.innerHTML);
}