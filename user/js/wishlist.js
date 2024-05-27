const pageList = document.getElementById("page-list");
let pageSize = 6;
let totalPage = 1;
let currentPage = 1;
let imageBase64 = null;
let textSearch = "";
let categoryFilter = "All";
let price = "";
const showProducts = document.getElementById("showProduct");
const productHead = document.getElementById("product-head");
const changePrice = document.getElementById("changePrice");
render();
/*==============================Render==========================*/
function render(){
    let userLogin = JSON.parse(localStorage.getItem("user_login")) || {};
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item=>item.userId == userLogin.id); 
    console.log(wishlist);
    //Filter by Price
    if(price == 1000000){
        wishlist = wishlist.filter(item => item.price < +price);
    }else if(price == 1500000){
        let priceStart = 10000000;
        let priceEnd = 20000000;
        wishlist = wishlist.filter(item => item.price > priceStart && item.price < priceEnd );
    }else if(price == 2000000){
        wishlist = wishlist.filter(item => item.price > +price);
    }
    //Filter by Search
    wishlist = wishlist.filter(wishlist => wishlist.name.toLowerCase().includes(textSearch));
    renderPaginations(wishlist);
    renderProducts(wishlist);
}
function renderPaginations(products) {
    totalPage = Math.ceil(products.length / pageSize);
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
function renderProducts(products) {
    let stringProducts = ""
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize
    if (end > products.length) {
        end = products.length
    }
    for (let i = start; i < end; i++) {
        stringProducts+=
            `
               <div class="single-product">
                    <div class="product-f-image" >
                        <img src="${products[i].image}"  style="object-fit: cover;" alt="">
                    </div>             
                    <div class="nameproduct"><a style="cursor:pointer;" onclick = "movetoSingle(${products[i].id})">${trimString(products[i].name,30)}</a></div>
                    <div class="product-carousel-price">
                        <ins>${formatMoney(products[i].price)}</ins> 
                    </div>
                    <div class="deleteWishlist">
                        <button class="btn" onclick="deleteWishlist(${products[i].idWish})">Delete</button>
                    </div>
                 </div>
            `
    }
    showProducts.innerHTML = stringProducts;
}
/*======================Change Range Price==================*/
changePrice.addEventListener('change',(event)=>{
    event.preventDefault();
    price = event.target.value; 
    render();
})
/*======================Delete wishlist====================*/
function deleteWishlist(id){
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let indexWish = wishlist.findIndex(item=>item.idWish == id);
    wishlist.splice(indexWish,1);
    localStorage.setItem("wishlist",JSON.stringify(wishlist));
    render();
}
function trimString(string, length) {
    return string.length > length ? 
           string.substring(0, length) + '...' :
           string;
};
function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}
function changeTextSearch(e) {
    textSearch = e.target.value.toLowerCase();
    render();
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
