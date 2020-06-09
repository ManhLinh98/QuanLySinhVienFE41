//tạo ob chứa thông tin request về api từ BE
//lưu ý: các thông tin phải chính xác với BE cung cấp
var objectAjax = {
  url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
  method: "GET",
  responeType: "json",
};

var loadDSSV = function () {
  //dung thư viện axios gửi thông tin yêu cầu từ backend tả dữ liệu
  var promise = axios(objectAjax);
  promise
    .then(function (res) {
      var noiDungTable = "";
      for (var i = 0; i < res.data.length; i++) {
        var sinhVien = res.data[i];

        noiDungTable += `
          <tr>
            <td>${sinhVien.MaSV}</td>
            <td>${sinhVien.HoTen}</td>
            <td>${sinhVien.Email}</td>
            <td>${sinhVien.SoDT}</td>
            <td>${sinhVien.DiemToan}</td>
            <td>${sinhVien.DiemLy}</td>
            <td>${sinhVien.DiemHoa}</td>
            <td><button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.MaSV}')">Xóa</button></td>
            <td><button class="btn btn-danger" onclick="chinhSua('${sinhVien.MaSV}')">Sửa</button></td>
          </tr>
          `;
      }
      document.getElementById("tblSinhVien").innerHTML = noiDungTable;
      console.log(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });


};
var chinhSua = function (MaSV) {
  console.log(MaSV)
  axios({
    //đường dẫn đến BE
    url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${MaSV}`,
    method: "GET",
  })
    .then(function (res) {
      // console.log(res.data);
      var sinhVien = res.data;
      document.getElementById("MaSV").value = sinhVien.MaSV;
      document.getElementById("HoTen").value = sinhVien.HoTen;
      document.getElementById("Email").value = sinhVien.Email;
      document.getElementById("SoDT").value = sinhVien.SoDT;
      document.getElementById("DiemToan").value = sinhVien.DiemToan;
      document.getElementById("DiemLy").value = sinhVien.DiemLy;
      document.getElementById("DiemHoa").value = sinhVien.DiemHoa;
    })
    .catch(function (err) {
      console.log(err.response.data);
    });
};

//chức năng cập nhật dữ liệu

document.getElementById('btnCapNhatSinhVien').onclick=function(){
  //lấy thông tin ng dùng nhập vào
  var sv = new SinhVien();
  sv.MaSV = document.getElementById("MaSV").value;
  sv.HoTen = document.getElementById("HoTen").value;
  sv.Email = document.getElementById("Email").value;
  sv.SoDT = document.getElementById("SoDT").value;
  sv.DiemToan = document.getElementById("DiemToan").value;
  sv.DiemLy = document.getElementById("DiemLy").value;
  sv.DiemHoa = document.getElementById("DiemHoa").value;
  console.log(sv);

  //gọi api cập nhật dữ liệu BE cung cấp

  axios({
    url:`http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien`,
    method:'PUT',
    data:sv
  }).then(function(res){
    console.log(res.data);
    loadDSSV();
  }).catch(function(err){
    console.log(err.response.data);
  })
}



var xoaSinhVien = function (MaSV) {
  var obAjaxXoaSinhVien = {
    url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${MaSV}`,
    method: "DELETE",
  };
  axios(obAjaxXoaSinhVien)
    .then(function (res) {
      console.log(res);
      loadDSSV();
    })
    .catch(function (err) {
      console.log(err);
      loadDSSV();
    });
};
loadDSSV();

//-------------------CHỨC NĂNG THÊM SINH VIÊN-----------
document.getElementById("btnThemSinhVien").onclick = function () {
  //tao đối tượng lấy thông tin người dùng nhập vào
  var sv = new SinhVien();
  sv.MaSV = document.getElementById("MaSV").value;
  sv.HoTen = document.getElementById("HoTen").value;
  sv.Email = document.getElementById("Email").value;
  sv.SoDT = document.getElementById("SoDT").value;
  sv.DiemToan = document.getElementById("DiemToan").value;
  sv.DiemLy = document.getElementById("DiemLy").value;
  sv.DiemHoa = document.getElementById("DiemHoa").value;

  //tạo object đưa dữ liệu về BE
  var obAxios = {
    url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
    method: "POST",
    data: sv, //sv là dữ liệu đưa về BE xử lý vì vậy cần phải ghi đúng chính xác tên các thuộc tính
  };

  //dung axios đư dữ liệu về BE
  axios(obAxios)
    .then(function (res) {
      console.log(res);
      //gọi lại phương thức load danh sách sinh viên mới từ server về
      loadDSSV();
    })
    .catch(function (err) {
      console.log(err.response.data);
      //gọi lại phương thức load danh sách sinh viên mới từ server về
      loadDSSV();
    });

  //gọi phương thức reload lại trang
  //   window.location.reload();
};
