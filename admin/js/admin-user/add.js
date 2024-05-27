const formAdminRegister = document.getElementById("form-admin-register");
const ADMININFOR = "admin";
const adminPass = document.getElementById("txtPass");
const confirmAdminPass = document.getElementById("txtConfirmPass");
let admininfor = JSON.parse(localStorage.getItem(ADMININFOR)) || [];

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

formAdminRegister.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
        values[name] = value;
    }
    if(validate(values)){
        values.id = (admininfor.length>0)? admininfor[admininfor.length-1].id +1 : 1;
        values.permision = +values.permision;
        admininfor.push(values);
        localStorage.setItem(ADMININFOR, JSON.stringify(admininfor));
        Swal.fire({
            title: "Good job!",
            text: "Create account success",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href="../../pages/user/list.html";
            }
          });
    }
})
function validate(infor) {
    var flag = true;
    if (infor.name.length < 8) {
      flag = false;
      showMessage("error1", "Invalid Username");
    }
    const index = admininfor.findIndex(
      (item) => item.name === infor.name
    );
    if (index !== -1) {
      showMessage("error1", "Username already exists");
      flag = false;
    }
    if(adminPass.value !== confirmAdminPass.value){
      showMessage("error2", "Confirm password incorrect");
      flag = false;
    }
     return flag;
  }
function showMessage(id, message) {
    var showMess = document.getElementById(id);
    showMess.innerText = message;
    showMess.style.color = "red";
}
  