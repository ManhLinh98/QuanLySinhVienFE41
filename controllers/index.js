/*ajax là cơ chế bất đồng bộ vì vậy mặc dù code chạy từ trên xuống dưới 
nhưng vẫn ưu tiên chạy code ở dưới trước r mới thwucj hiện các hàm ajax sau cùng.*/


//tạo đối tượng chứa 3 thuộc tính càn thiết để giao tiếp với backend
var objectAjax = {
  url: "../data/DanhSachNguoiDung.json", //đường dẫn đến file chứa dữ liệu hoặc api backend
  mothod: "GET", //giao thức backend cung cấp uwgs với url
  responseType: "json",
};

//dùng thư viện để đọc file hoặc api từ backend

var promise = axios(objectAjax);

promise.then(function (res) {
   var noiDungTable='';
    //hàm xử lý khi request thành công
    for (var i = 0; i < res.data.length; i++) {
      var nguoiDung = res.data[i];
      noiDungTable+=`
      <tr>
        <td>${nguoiDung.TaiKhoan}</td>
        <td>${nguoiDung.MatKhau}</td>
        <td>${nguoiDung.HoTen}</td>
        <td>${nguoiDung.Email}</td>
        <td>${nguoiDung.SoDT}</td>
      </tr>
      `
    }
    document.getElementById('tblNguoiDung').innerHTML=noiDungTable;
  }).catch(function (error) {
    //hàm xử lý khi request thất bại
    console.log(error);
  });


