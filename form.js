// Đặt focus vào ô họ tên
document.getElementById("hoten").focus();

// Chuẩn hóa họ tên khi rời khỏi ô
document.getElementById("hoten").onblur = function() {
  this.value = ChuanhoaTen(this.value);
};

// Tự động thêm dấu "/" khi nhập ngày sinh
document.getElementById("ngaysinh").oninput = function() {
  let v = this.value.replace(/[^0-9]/g, "");
  if (v.length > 2 && v.length <= 4)
    v = v.slice(0, 2) + "/" + v.slice(2);
  else if (v.length > 4)
    v = v.slice(0, 2) + "/" + v.slice(2, 4) + "/" + v.slice(4, 8);
  this.value = v;
};

// Kiểm tra email khi rời ô
document.getElementById("email").onblur = function() {
  let email = this.value.trim();
  let loi = document.getElementById("loi_email");
  loi.innerHTML = "";
  if (!laEmail(email)) {
    loi.innerHTML = "E-mail không đúng định dạng";
  }
};

// Kiểm tra mật khẩu nhập lại
document.getElementById("repass").onblur = function() {
  let pass = document.getElementById("pass").value;
  let repass = this.value;
  let loi = document.getElementById("loi_repass");
  loi.innerHTML = "";
  if (repass !== pass) {
    loi.innerHTML = "Mật khẩu gõ lại không đúng";
  }
};

// ---------- Các hàm hỗ trợ ----------
function laEmail(s) {
  const re = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/;
  return re.test(s);
}

function ChuanhoaTen(ten) {
  let ss = ten.trim().split(/\s+/);
  return ss.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

function laNgayThang(d) {
  let s = d.split('/');
  if (s.length !== 3) return false;
  let ngay = parseInt(s[0]), thang = parseInt(s[1]), nam = parseInt(s[2]);
  if (isNaN(ngay)||isNaN(thang)||isNaN(nam)) return false;
  if (thang < 1 || thang > 12 || ngay < 1) return false;
  let max = [31, (nam%4==0&&nam%100!=0)||nam%400==0 ? 29:28,31,30,31,30,31,31,30,31,30,31][thang-1];
  if (ngay > max) return false;
  let yearNow = new Date().getFullYear();
  return nam >= 1950 && nam <= yearNow;
}

// Hiển thị lỗi
function loi(id,msg){
  document.getElementById("loi_"+id).innerHTML=msg;
  document.getElementById(id).focus();
}

// Nút “Chấp nhận”
function Chapnhan() {
  let ok = true;
  ["hoten","ngaysinh","email","username","pass","repass"].forEach(id=>{
    document.getElementById("loi_"+id).innerHTML="";
  });

  if (document.getElementById("hoten").value.trim()==="") {
    loi("hoten","Quý vị chưa nhập họ tên");
    ok=false;
  }

  if (document.getElementById("ngaysinh").value.trim()==="") {
    loi("ngaysinh","Quý vị chưa nhập ngày sinh"); ok=false;
  } else if(!laNgayThang(document.getElementById("ngaysinh").value)){
    loi("ngaysinh","Ngày sinh không đúng định dạng"); ok=false;
  }

  let email=document.getElementById("email").value.trim();
  if(email===""){loi("email","Quý vị chưa nhập e-mail");ok=false;}
  else if(!laEmail(email)){loi("email","E-mail không đúng định dạng");ok=false;}

  let user=document.getElementById("username").value.trim();
  if(user===""){loi("username","Quý vị chưa nhập tên sử dụng");ok=false;}

  let pass=document.getElementById("pass").value;
  let repass=document.getElementById("repass").value;
  if(pass===""){loi("pass","Quý vị chưa nhập mật khẩu");ok=false;}
  else if(repass===""){loi("repass","Quý vị chưa gõ lại mật khẩu");ok=false;}
  else if(pass!==repass){loi("pass","Mật khẩu và gõ lại không trùng nhau");ok=false;}

  if(ok) alert("Form hợp lệ và sẵn sàng gửi!");
}

// Nút “Bỏ qua”
function Boqua(){
  document.getElementById("form1").reset();
  document.querySelectorAll("span.Baoloi").forEach(e=>e.innerHTML="");
  document.querySelector("img.preview").classList.add("nodisplay");
}

// Hiển thị ảnh chân dung
document.getElementById("FileUpload1").onchange = function () {
  let preview = document.querySelector("img.preview");
  let file = this.files[0];
  let reader = new FileReader();
  reader.onload = function () {
    preview.src = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
    preview.classList.remove("nodisplay");
  }
};
