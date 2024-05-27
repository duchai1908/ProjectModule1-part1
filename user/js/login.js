const userName = document.getElementById("txtUsername");
const userPass = document.getElementById("txtUserpassword");
const formLogin = document.getElementById("form-login");
const checkPass = document.getElementById("checkPass");
const USERINFOR = "user";
formLogin.onsubmit = function(e){
    e.preventDefault();
    var flag = 1;
    let checkLogin = JSON.parse(localStorage.getItem(USERINFOR)) || [];
    for(let i in checkLogin){
        if(checkLogin[i].name == userName.value && checkLogin[i].password == userPass.value && checkLogin[i].status ==true){
            const userFind = checkLogin.find(item => item.name == userName.value);
            localStorage.setItem("user_login", JSON.stringify(userFind));
            flag = 0;
            break;
        }
        else if(checkLogin[i].name == userName.value && checkLogin[i].password == userPass.value && checkLogin[i].status ==false){
            flag = 2;
            break;
        }
    }
    if(flag==0){

        window.location.href ="main.html";
    }else if(flag == 2){
        Swal.fire({
            title: "Opps!",
            text: "Your account is block",
            icon: "error"
          });
    }
    else{
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