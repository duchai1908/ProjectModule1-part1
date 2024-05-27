const ORDER = "order";
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
let imageBase64 = null;
let textSearch = "";
let categoryFilter = "All";
const CATEGORY = "category";
const PRODUCT = "product";
const tbodyHTML = document.getElementById("list-oder");
const pageList = document.getElementById("page-list");
const orderCode = document.getElementById("code");
const customer = document.getElementById("customer");
const phone = document.getElementById("phone");
const total = document.getElementById("total");
const orderItem = document.getElementById("list-order-item");
const checkStatus = document.getElementsByName("statusOrder");
const updateForm = document.getElementById("updateForm");
let orderId = document.getElementById("orderId");
/*=========================Render======================*/
render();
function render(){
    let orderCart = JSON.parse(localStorage.getItem(ORDER)) || [];
    // if (categoryFilter !== "All") {
    //     orderCart = orderCart.filter(
    //         (order) => order.status == +categoryFilter
    //     );
    // }
    // orderCart = orderCart.filter((product) =>
    //     orderCart.codeOrders.toLowerCase().includes(textSearch)
    // );
    renderPaginations(orderCart);
     renderProducts(orderCart);
 }
function renderPaginations(products) {
    totalPage = Math.ceil(products.length / pageSize);
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
function renderProducts(orders) {
    let stringHTML = "";
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    let user = JSON.parse(localStorage.getItem("user")) || [];
    let checkStatus = JSON.parse(localStorage.getItem("check"));
    if (end > orders.length) {
        end = orders.length;
    }
    for (let i = start; i < end; i++) {
        var userName = user.findIndex(
            (item) => item.id == orders[i].idUser
        );
        var statusCheck = checkStatus.findIndex(
            (item) => item.id == orders[i].status
        );
        let statusName = checkStatus[statusCheck].name;
        let nameCustomer = user[userName].name;
        stringHTML += `
        <tr class="odd gradeX" align="center">
            <td>${orders[i].id}</td>
            <td>${orders[i].cartOrder}</td>
            <td>${nameCustomer}</td>
            <td>${formatMoney(orders[i].total)}</td>
            <td>${orders[i].dateTime}</td>
            <td>${statusName}</td>
            <td class="center"><button type="button" onclick="detailOrder(${orders[i].id
            })" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i class="fa fa-eye fa-fw"></i></button></td>
        </tr>
        `;
    }
    tbodyHTML.innerHTML = stringHTML;
}
/*=========================DETAIL ORDER ==========================*/
function detailOrder(id){
    let order = JSON.parse(localStorage.getItem("order")) || [];
    let indexOder = order.findIndex(item =>item.id == id);
    let stringHTML = "";
    let user = JSON.parse(localStorage.getItem("user")) || [];
    var userName = user.findIndex(
        (item) => item.id == order[indexOder].idUser
    );
    orderCode.innerHTML= order[indexOder].cartOrder;
    customer.innerHTML = user[userName].name;
    total.innerHTML = formatMoney(order[indexOder].total);
    phone.innerHTML = user[userName].phone;
    //checkStatus 
    for(let i = 0; i< checkStatus.length; i++){
        if(checkStatus[i].value == order[indexOder].status){
            checkStatus[i].checked = true;
        }
    }
    //render CartDetail
    for(let i in order[indexOder].cartList){
        stringHTML+= `
            <tr class="odd gradeX" align="center">
                <td>
                    <img width="52px" src="${order[indexOder].cartList[i].image}" alt="img">
                </td>
                <td>${order[indexOder].cartList[i].name}</td>
                <td>${order[indexOder].cartList[i].qty}</td>
            </tr>
        `;
    }
    orderId.value = id;
    orderItem.innerHTML = stringHTML;
}
/*===========================Update Order=====================*/
updateForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
        values[name] = value;
    }
    let oder = JSON.parse(localStorage.getItem("order")) || [];
    let indexOrder =  oder.findIndex(item => item.id == orderId.value);
    oder[indexOrder].status = values.statusOrder;
    localStorage.setItem("order",JSON.stringify(oder));
    Swal.fire({
        title: "Good job!",
        text: "Update order success",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload();
        }
    });
    
})
function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(money);
}
/*================Change Page Pagination====================*/
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