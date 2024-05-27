const CATEGORY = "category";
const PRODUCT = "product";
const sSelect = document.getElementById("category");
const formCate = document.getElementById("form-product-add");
const imageProductHTML = document.getElementById('image-product');
let imageBase64 = null;

categorySelect()
function categorySelect(){
    let categoties = JSON.parse(localStorage.getItem(CATEGORY)) || [];
    let selectHTML = "";
    let tbt = `<option value="All">All</option>`;
    categoties.forEach(element => {
        selectHTML+= 
        `
        <option value="${element.id}">${element.name}</option>
        `
    });
    sSelect.innerHTML = selectHTML;
    // cateSelect.innerHTML =tbt + selectHTML;
}
formCate.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
        values[name] = value;
    }
    values.price = +values.price;
    values.quantity = +values.quantity;
    values.image = imageBase64;
    let check = validate(values);
    if(check){
        let products = JSON.parse(localStorage.getItem(PRODUCT)) || [];
        values.id = (products.length > 0)? products[products.length -1].id +1 : 1;
        values.status = true;
        products.push(values);
        localStorage.setItem(PRODUCT, JSON.stringify(products));
        Swal.fire({
            title: "Good job!",
            text: "Create product success",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href="../../pages/products/list.html";
            }
          });
    }
    
})
function validate(data){
    let flag = true;
    if (data.name <= 3) {
        showMessage("error1","Has at least 3 characters");
        return false;
    }
    if (data.quantity <= 0) {
        showMessage("error3","Quantity cannot be less than 0")
        return false;
    }
    if (data.price <= 0) {
        showMessage("error2","Price cannot be less than 0")
        return false;
    }
    if (data.description.length <= 10) {
        showMessage("error4","Description cannot be less than 10 characters");
        return false;
    }
    return flag;
}
function showMessage(id, message) {
    var showMess = document.getElementById(id);
    showMess.innerText = message;
    showMess.style.color = "red";
}
function convertToBase64() {
    const fileInput = document.getElementById('input-image');
    const file = fileInput.files[0];
    const reader = new FileReader(); //đọc data của 1 hình ảnh

    reader.onload = function (e) {
        const base64 = e.target.result;
        imageBase64 = base64;
        imageProductHTML.src = imageBase64;
    }
    reader.readAsDataURL(file);
}