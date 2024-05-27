const userName = document.getElementById("txtUsername");
const userPass = document.getElementById("txtUserpassword");
const formLogin = document.getElementById("form-login");
const checkPass = document.getElementById("checkPass");
const USERINFOR = "admin";
formLogin.onsubmit = function(e){
    var flag = 1;
    e.preventDefault();
    let checkLogin = JSON.parse(localStorage.getItem(USERINFOR)) || [];
    for(let i in checkLogin){
        if(checkLogin[i].name === userName.value && checkLogin[i].password ===userPass.value ){
            const userFind = checkLogin.find(item => item.name == userName.value);
            localStorage.setItem("admin_login", JSON.stringify(userFind));
            flag = 0;
            break;
        }
    }
    if(flag==0){
        window.location.href ="pages/master.html";
    }else{
        Swal.fire({
            title: "Opps!",
            text: "Username or password is incorrect",
            icon: "error"
          });
    }
}
checkPass.onclick=function(){
    userPass.type = (userPass.type === "password")? "text":"password";
}