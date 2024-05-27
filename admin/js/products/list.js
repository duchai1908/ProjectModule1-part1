let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
let imageBase64 = null;
let textSearch = "";
let categoryFilter = "All";
const CATEGORY = "category";
const PRODUCT = "product";
const pageList = document.getElementById("page-list");
const tbodyHTML = document.getElementById("list-admin");
const cateSelect = document.getElementById("cateSelected");
const sSelect = document.getElementById("category");
const updateCate = document.getElementById("input-image");
const updateImgCate = document.getElementById("image-product");
const updateFormCate = document.getElementById("updateForm");
let uId = document.getElementById("adminId");
let checkimg = true;
let statusProduct = true;

render();

//Hàm render lọc qua các giá trị product
function render() {
    let products = JSON.parse(localStorage.getItem(PRODUCT)) || [];
    //lọc theo category
    if (categoryFilter !== "All") {
        products = products.filter(
            (product) => product["category-id"] == +categoryFilter
        );
    }

    //lọc theo search
    products = products.filter((product) =>
        product.name.toLowerCase().includes(textSearch)
    );
    renderPaginations(products);
    renderProducts(products);
}
function renderPaginations(products) {
    totalPage = Math.ceil(products.length / pageSize); //làm trên lên
    let stringHTML = "";
    for (let i = 1; i <= totalPage; i++) {
        if (currentPage === i) {
            stringHTML += `
            <span class="page-item page-active" onclick="clickPage(${i})">${i}</span>
            `;
        } else {
            stringHTML += `
            <span class="page-item " onclick="clickPage(${i})">${i}</span>
            `;
        }
    }
    pageList.innerHTML = stringHTML;
}
function renderProducts(products) {
    let stringHTML = "";
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    if (end > products.length) {
        end = products.length;
    }
    var categoties = JSON.parse(localStorage.getItem(CATEGORY));
    for (let i = start; i < end; i++) {
        var index12 = categoties.findIndex(
            (item) => item.id == products[i]["category-id"]
        );
        let selectedHTML = categoties[index12].name;
        stringHTML += `
        <tr class="odd gradeX" align="center">
            <td>${products[i].id}</td>
            <td>
                <img width="52px" src="${products[i].image}" alt="img">
            </td>
            <td>${products[i].name}</td>
            <td>${formatMoney(products[i].price)}</td>
            <td>${products[i].quantity}</td>
            <td>${products[i].description}</td>
            <td>${selectedHTML}</td>
            <td>${products[i].status ? "Active" : "Block"}</td>
            <td>  <button type="button" class="btn btn-primary" onClick="changeStatus(${i})">${products[i].status
                ? '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>'
                : '<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>'
            }</button></td>
            <td class="center"><button type="button" class="btn btn-danger" onclick="deleteProduct(${products[i].id
            })"><i class="fa fa-trash-o  fa-fw"></i></button></td>
            <td class="center"><button type="button" onclick="initupdateProduct(${products[i].id
            })" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i class="fa fa-pencil fa-fw"></i></button></td>
        </tr>
        `;
    }
    tbodyHTML.innerHTML = stringHTML;
}
function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(money);
}
function changeStatus(i) {
    let products = JSON.parse(localStorage.getItem(PRODUCT));
    products[i].status = !products[i].status;
    localStorage.setItem(PRODUCT, JSON.stringify(products));
    render();
}
function changeTextSearch(e) {
    textSearch = e.target.value.toLowerCase();
    render();
}
function changeCategory(e) {
    categoryFilter = e.target.value;
    currentPage = 1;
    render();
}
categorySelect();
function categorySelect() {
    let categoties = JSON.parse(localStorage.getItem(CATEGORY)) || [];
    let selectHTML = "";
    let tbt = `<option value="All">All</option>`;
    categoties.forEach((element) => {
        selectHTML += `
        <option value="${element.id}">${element.name}</option>
        `;
    });
    sSelect.innerHTML = selectHTML;
    cateSelect.innerHTML = tbt + selectHTML;
}
function initupdateProduct(data) {
    let products = JSON.parse(localStorage.getItem(PRODUCT));
    let newProducts = products.findIndex((product) => product.id == data);
    setFieldsValue("updateForm", products[newProducts]);
    updateCate.src = products[newProducts].image;
    updateImgCate.src = products[newProducts].image;
    statusProduct = products[newProducts].status;
    uId.value = data;
}
function setFieldsValue(formId, data) {
    const form = document.getElementById(formId);
    if (!form) return;
    Object.keys(data).forEach((key) => {
        const field = form.querySelector(`[name=${key}]`);
        if (field) {
            field.value = data[key];
        }
    });
}

updateFormCate.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
        values[name] = value;
    }
    values.price = +values.price;
    values.quantity = +values.quantity;
    if (checkimg) {
        values.image = updateCate.src;
    } else {
        values.image = imageBase64;
    }
    values.status = statusProduct;
    let check = validate(values);
    if (check) {
        let products = JSON.parse(localStorage.getItem(PRODUCT));
        let newProducts = products.findIndex((product) => product.id == uId.value);
        values.id = +uId.value
        products[newProducts] = values
        localStorage.setItem(PRODUCT, JSON.stringify(products));
        Swal.fire({
            title: "Good job!",
            text: "Update product success",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "../../pages/products/list.html";
            }
            // render()
        });
    }
});

function deleteProduct(data){
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
            let products = JSON.parse(localStorage.getItem(PRODUCT));
            let newProducts = products.findIndex((product) => product.id == data);
            products.splice(newProducts,1);
            localStorage.setItem(PRODUCT,JSON.stringify(products))
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          });
          render();
        }
      });
}
function validate(data) {
    let flag = true;
    if (data.name <= 3) {
        showMessage("error1", "Has at least 3 characters");
        return false;
    }
    if (data.quantity <= 0) {
        showMessage("error3", "Quantity cannot be less than 0");
        return false;
    }
    if (data.price <= 0) {
        showMessage("error2", "Price cannot be less than 0");
        return false;
    }
    if (data.description.length <= 10) {
        showMessage("error4", "Description cannot be less than 10 characters");
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
    checkimg = false;
    const fileInput = document.getElementById("input-image");
    const file = fileInput.files[0];
    const reader = new FileReader(); //đọc data của 1 hình ảnh

    reader.onload = function (e) {
        const base64 = e.target.result;
        imageBase64 = base64;
        updateImgCate.src = imageBase64;
    };
    reader.readAsDataURL(file);
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
