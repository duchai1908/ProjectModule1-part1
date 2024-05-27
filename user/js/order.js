let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
let textSearch = "";
let categoryFilter = "All";
const tbodyHTML = document.getElementById("order-body");
const pageList = document.getElementById("page-list");
const customer = document.getElementById("customer");
const phone = document.getElementById("phone");
const total = document.getElementById("total");
const cartList = document.getElementById("list-order-item");
const cancelOrderBtn = document.getElementById("cancelOrder");
let orderId = document.getElementById("orderId");
/*===============render=============*/
render();
function render(){
    let order = JSON.parse(localStorage.getItem("order")) || [];
    let user = JSON.parse(localStorage.getItem("user_login")) || {};
    //
    order = order.filter(item => item.idUser == user.id);
    //
    order = order.filter(product => product.cartOrder.toString().includes(textSearch));
    renderPaginations(order);
    renderProducts(order);
}
/*===============renderPagination===============*/
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
/*================renderProduct==================*/
function renderProducts(orders) {
    let user = JSON.parse(localStorage.getItem("user")) || [];
    let orderStatus = JSON.parse(localStorage.getItem("check")) || [];
    let stringHTML = "";
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    if (end > orders.length) {
        end = orders.length;
    }
    for (let i = start; i < end; i++) {
        var userName = user.findIndex(
            (item) => item.id == orders[i].idUser
        );
        var indexOrder = orderStatus.findIndex(
            (item) => item.id == orders[i].status
        );
        stringHTML += `
        <tr  class="odd gradeX" align="center">
            <td>${orders[i].cartOrder}</td>
            <td>${user[userName].name}</td>
            <td>${formatMoney(orders[i].total)}</td>
            <td>${orderStatus[indexOrder].name}</td>
            <td class="center">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="detailOrder(${orders[i].id})">
                    <i class="fa fa-eye fa-fw"></i>
                </button>
            </td>
        </tr>
        `;
    }
    tbodyHTML.innerHTML = stringHTML;
}
/*==============Deltail Order===================*/
function detailOrder(id){
    let stringHTML="";
     //get index user
    let user = JSON.parse(localStorage.getItem("user")) || [];
    let user_login = JSON.parse(localStorage.getItem("user_login")) || [];
    let indexUser = user.findIndex(item => item.id == user_login.id);
    //get index order
    let order = JSON.parse(localStorage.getItem("order")) || [];
    let indexOrder = order.findIndex(item => item.id == id)
    //render infor order
    customer.innerHTML = user[indexUser].name;
    phone.innerHTML = user[indexUser].phone;
    total.innerHTML = formatMoney(order[indexOrder].total);
    for(let i in order[indexOrder].cartList){
        stringHTML+= `
            <tr class="odd gradeX" align="center">
                <td>
                    <img width="52px" src="${order[indexOrder].cartList[i].image}" alt="img">
                </td>
                <td><a style="cursor:pointer;" onclick = "movetoSingle(${order[indexOrder].cartList[i].productId})">${trimString(order[indexOrder].cartList[i].name, 20)}</a></td>
                <td>${order[indexOrder].cartList[i].qty}</td>
            </tr>
        `;
    }
    cartList.innerHTML = stringHTML;
    // disable button Cancel
    cancelOrderBtn.disabled = false;
    if(order[indexOrder].status == 2 || order[indexOrder].status == 3 || order[indexOrder].status == 4){
        cancelOrderBtn.disabled = true;
    }
    orderId.value = id;
}
/*======================CancelOrder====================*/
function cancelOrder(){
    let order = JSON.parse(localStorage.getItem("order")) || [];
    let indexOder = order.findIndex(item=>item.id == orderId.value)
    order[indexOder].status = 4;
    localStorage.setItem("order",JSON.stringify(order));
    Swal.fire({
        title: "Success!",
        text: "Your order has been deleted !",
        confirmButtonText: "OK",
        icon: "success"
        
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload();
        }
      });;
    
}
/*===================Search Order Code ================*/
function changeTextSearch(e) {
    textSearch = e.target.value;
    render();
}

/*=================change page pagination================*/
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
// *=====================Move Page to SingleProduct =====================*/
function movetoSingle(id){
    let value = {};
        value ={
            product_id: id,
        }
    localStorage.setItem("single_product", JSON.stringify(value));
    window.location.href="http://127.0.0.1:5500/user/pages/single-product.html";
}
/*=========================LOG IN LOG OUT============================*/
const checkUserLogin = document.getElementById("login");
const checkUserLogout = document.getElementById("logout");
const checkOrder = document.getElementById("checkOrder");
checkLogin();
function checkLogin(){
    let user = JSON.parse(localStorage.getItem("user_login")) || {};
    if(Object.keys(user).length > 0){
        checkUserLogin.classList.add("hidden");
        checkUserLogout.classList.remove("hidden");
        checkOrder.classList.remove("hidden");
    }
}
checkUserLogout.addEventListener('click',(e)=>{
    localStorage.removeItem("user_login");
    window.location.reload();
})
function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(money);
}
function reloadPage(){
    window.location.reload();
}
function trimString(string, length) {
    return string.length > length ? 
           string.substring(0, length) + '...' :
           string;
};
function changePageProduct(){
    localStorage.removeItem("detail_product");
    window.location.href="http://127.0.0.1:5500/user/pages/shop.html";
}