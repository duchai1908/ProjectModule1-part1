const ADMININFOR = "admin";
const pageList = document.getElementById("page-list");
const adminlist = document.getElementById("list-admin");
const rd = document.getElementsByName("permision");
const uId = document.getElementById("adminId");
const newName = document.getElementById("newName");
const newEmail = document.getElementById("newEmail");
const oldAdminPass = document.getElementById("oldPass");
const formUpdate = document.getElementById("updateForm");
const adminPass = document.getElementById("newPass");
const confirmAdminPass = document.getElementById("confirmPass");
const spanerror = document.getElementsByTagName("span");
const changePassword = document.getElementById("changePassword");
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
let textSearch = "";
render();
function render(){
    let admininfor = JSON.parse(localStorage.getItem(ADMININFOR)) || [];
    admininfor = admininfor.filter(user => user.name.toLowerCase().includes(textSearch));
    renderPaginations(admininfor);
    renderProducts(admininfor);
}
function renderPaginations(user) {

    totalPage = Math.ceil(user.length / pageSize); //làm trên lên 
    let stringHTML = ""
    for (let i = 1; i <= totalPage; i++) {
        if (currentPage === i) {
            stringHTML += `
            <span class="page-item page-active" onclick="clickPage(${i})">${i}</span>
            `
        }
        else {
            stringHTML += `
            <span class="page-item " onclick="clickPage(${i})">${i}</span>
            `
        }
    }
    pageList.innerHTML = stringHTML;
}
function renderProducts(user) {
    let stringHTML = ""
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize
    if (end > user.length) {
        end = user.length
    }
    for (let i = start; i < end; i++) {
        var role = user[i].permision === 1? "Admin": "Manager";
        stringHTML +=
            `
            <tr class="odd gradeX" align="center">
                <td>${user[i].id}</td>
                <td>${user[i].name}</td>
                <td>${role}</td>
                <td class="center"><button type="button" class="btn btn-danger" onclick="deleteAdmin(${user[i].id})"><i class="fa fa-trash-o  fa-fw"></i></button></td>
                <td class="center"><button type="button" onclick="initupdateAdmin(${user[i].id})" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i class="fa fa-pencil fa-fw"></i></button></td>
            </tr>
            `
    }
    adminlist.innerHTML = stringHTML
}
function initupdateAdmin(data){
    for(let i =0; i< spanerror.length ;i++){
        spanerror[i].innerText = "";
    }
    let dis = document.getElementById("disable-form");
    if(!dis.classList.contains("disable-form")){
        dis.classList.add("disable-form");
    }
    let admininfor = JSON.parse(localStorage.getItem(ADMININFOR)) || [];
    let newAdmin = admininfor.findIndex(user => user.id === data);
    newName.value = admininfor[newAdmin].name;
    newEmail.value = admininfor[newAdmin].email;
    // setFieldsValue("updateForm",admininfor[newAdmin]);
    for(let i =0;i<rd.length;i++){
        if(rd[i].value == admininfor[newAdmin].permision){
            rd[i].checked = true;
        }
    }
    uId.value= admininfor[newAdmin].id;
}
function changeTextSearch(e) {
    textSearch = e.target.value.toLowerCase();
    render();
}
function setFieldsValue(formId, data) {
    const form = document.getElementById(formId);
    if (!form) return;
    Object.keys(data).forEach(key => {
        const field = form.querySelector(`[name=${key}]`);
        if (field) {
            field.value = data[key]; 
        }
    });
}
formUpdate.addEventListener("submit",(e)=>{
    e.preventDefault();
    let admininfor = JSON.parse(localStorage.getItem(ADMININFOR)) || [];
    let newAdmin = admininfor.findIndex(user => user.id == uId.value);
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
        values[name] = value;
    }
    if(validate(values,admininfor[newAdmin].name)){
        if(adminPass.value != "" && confirmAdminPass.value !=""){
            values.password = adminPass.value;
        }else{
            values.password = admininfor[newAdmin].password;
        }
        values.permision = +values.permision;
        values.id = +uId.value;
        admininfor[newAdmin] = values;
        localStorage.setItem(ADMININFOR, JSON.stringify(admininfor));
        Swal.fire({
            title: "Good job!",
            text: "Update account success",
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
function validate(infor,id) {
    for(let i =0; i< spanerror.length ;i++){
        spanerror[i].innerText = "";
    }
    let admininfor = JSON.parse(localStorage.getItem(ADMININFOR)) || [];
    var flag = true;
    if (infor.name.length < 8) {
      flag = false;
      showMessage("error1", "Invalid Username");
    }
    const index = admininfor.findIndex(
      (item) => item.name === infor.name
    );
    if (index !== -1 && infor.name != id ) {
      showMessage("error1", "Username already exists");
      flag = false;
    }
    const oldpas = admininfor.findIndex(
        (item) => item.password === oldAdminPass.value
    );
    if(oldpas === -1 && oldAdminPass.value != "" ){
        showMessage("error2", "Old password incorrect");
        flag = false;
    }
    if(adminPass.value !== confirmAdminPass.value && adminPass.value != ""){
      showMessage("error3", "Confirm password incorrect");
      flag = false;
    }
      return flag;
}
function showMessage(id, message) {
    var showMess = document.getElementById(id);
    showMess.innerText = message;
    showMess.style.color = "red";
}
function deleteAdmin(data){
    let admininfor = JSON.parse(localStorage.getItem(ADMININFOR)) || [];
    let newAdmin = admininfor.findIndex(user => user.id === data);
    admininfor.splice(newAdmin,1);
    localStorage.setItem(ADMININFOR, JSON.stringify(admininfor));
    render();
}
changePassword.addEventListener("click",(e)=>{
    e.preventDefault();
    let dis = document.getElementById("disable-form");
    dis.classList.toggle("disable-form");
    oldAdminPass.disabled = false;
    confirmAdminPass.disabled = false;
    adminPass.disabled = false;
})

