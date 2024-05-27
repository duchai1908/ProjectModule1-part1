const USERINFOR = "user";
const userName = document.getElementById("txtUsername");
const userPass = document.getElementById("txtUserpwd");
const userEmail = document.getElementById("txtUseremail");
const confirmPass = document.getElementById("txtConfirmpwd");
const formRegister = document.getElementById("form-register");
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
formRegister.onsubmit = function(e){
  e.preventDefault();
  const formData = new FormData(e.target);
  const values = {};
  for (let [name, value] of formData.entries()) {
    values[name] = value;
  }
  
  if(validate(values)){
    let userinfor = JSON.parse(localStorage.getItem(USERINFOR)) || [];
    values.id = (userinfor.length>0)? userinfor[userinfor.length-1].id +1 : 1;
    values.phone = +values.phone;
    values.status = true;
    userinfor.push(values);
    localStorage.setItem(USERINFOR, JSON.stringify(userinfor));
    Swal.fire({
      title: "Good job!",
      text: "Create account success",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href="login.html";
      }
    });
  }  
}
function validate(infor) {
  let userinfor = JSON.parse(localStorage.getItem(USERINFOR)) || [];
  var flag = true;
  if (infor.name.length < 8) {
    flag = false;
    showMessage("error1", "Username k hop le");
  }
  const index = userinfor.findIndex(
    (item) => item.name === infor.name
  );
  console.log(index);
  if (index !== -1) {
    showMessage("spanuser", "Username da ton tai");
    flag = false;
  }
  if(userPass.value !== confirmPass.value){
    showMessage("error4", "Confirm password wrong");
    flag = false;
  }
  return flag;
}
function showMessage(id, message) {
  var showMess = document.getElementById(id);
  showMess.innerText = message;
  showMess.style.color = "red";
}

