const CATEGORY = "category";
const adminlist = document.getElementById("list-admin");
const pageList = document.getElementById("page-list");
const formCate = document.getElementById("updateForm");
const uId = document.getElementById("adminId");
let categoryItem = JSON.parse(localStorage.getItem(CATEGORY)) || [];
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
let textSearch = "";
render();

function render(){
    let categoryItem = JSON.parse(localStorage.getItem(CATEGORY)) || [];
    categoryItem = categoryItem.filter(user => user.name.toLowerCase().includes(textSearch));
    renderPaginations(categoryItem);
    renderProducts(categoryItem);
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
        stringHTML +=
            `
            <tr class="odd gradeX" align="center">
                <td>${user[i].id}</td>
                <td>${user[i].name}</td>
                <td class="center"><button type="button" class="btn btn-danger" onclick="deleteCategory(${user[i].id})"><i class="fa fa-trash-o  fa-fw"></i></button></td>
                <td class="center"><button type="button" onclick="initupdateCategory(${user[i].id})" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i class="fa fa-pencil fa-fw"></i></button></td>
            </tr>
            `
    }
    adminlist.innerHTML = stringHTML
}
formCate.addEventListener("submit",(e)=>{
    e.preventDefault();
    let categoryItem = JSON.parse(localStorage.getItem(CATEGORY)) || [];
    let newCategory = categoryItem.findIndex(cate => cate.id == uId.value);
    var newName = document.getElementById("newName");
    if(validate(newName.value,categoryItem[newCategory].name)){
        categoryItem[newCategory].name = newName.value;
        categoryItem[newCategory].id = +uId.value;
        localStorage.setItem(CATEGORY, JSON.stringify(categoryItem));
        Swal.fire({
            title: "Good job!",
            text: "Update category success",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href="../../pages/category/list.html";
            }
          });
    }
    
})
function changeTextSearch(e) {
    textSearch = e.target.value.toLowerCase();
    render();
}
function initupdateCategory(data){
    var spanError = document.getElementById("error1");
        spanError.innerText="";
    let categoryItem = JSON.parse(localStorage.getItem(CATEGORY)) || []; 
    let newCategory = categoryItem.findIndex(cate => cate.id === data);
    setFieldsValue("updateForm",categoryItem[newCategory]);
    uId.value = data;
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
function validate(data,id){
    var flag = true;
    let categoryItem = JSON.parse(localStorage.getItem(CATEGORY)) || [];
    let newCate = categoryItem.findIndex(cate => cate.name == data);
    if(newCate !== -1 && data != id){
        showMessage("error1", "Username already exists");
        flag = false;
    }
    return flag;
}
function showMessage(id, message) {
    var showMess = document.getElementById(id);
    showMess.innerText = message;
    showMess.style.color = "red";
}
function deleteCategory(data){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            let categoryItem = JSON.parse(localStorage.getItem(CATEGORY)) || [];
            let newCate = categoryItem.findIndex(cate => cate.id === data);
            categoryItem.splice(newCate,1);
            localStorage.setItem(CATEGORY, JSON.stringify(categoryItem));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          render();
        }
      });
}
function clickPage(i) {
    currentPage = i;
    render();
}
function changePage(status) {
    if (status === -1 && currentPage > 1) {
        currentPage -= 1;
    }
    if (status === 1 && currentPage < totalPage) {
        currentPage += 1;
    }
    render();
}