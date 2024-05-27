const PRODUCT = "product";
const DETAILPRODUCT = "detail_product";
const CATEGORY = "category";
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
let checkDetailProduct = JSON.parse(localStorage.getItem(DETAILPRODUCT)) || {};
render();
/*==============================Render==========================*/
function render(){
    let products = JSON.parse(localStorage.getItem(PRODUCT)) || [];
    // Filter by Category
    if(Object.keys(checkDetailProduct).length > 0){
        let category = JSON.parse(localStorage.getItem(CATEGORY)) || [];
        let categoryIndex = category.findIndex(item => item.id == checkDetailProduct.cate);
        productHead.innerHTML = category[categoryIndex].name;   
        products = products.filter(product => product["category-id"] == checkDetailProduct.cate);
    }else{
        productHead.innerHTML = "All Products"; 
    } 
    //Filter by Price
    if(price == 1000000){
        products = products.filter(item => item.price < +price);
    }else if(price == 1500000){
        let priceStart = 10000000;
        let priceEnd = 20000000;
        products = products.filter(item => item.price > priceStart && item.price < priceEnd );
    }else if(price == 2000000){
        products = products.filter(item => item.price > +price);
    }
    //Filter by Search
    products = products.filter(product => product.name.toLowerCase().includes(textSearch));
    renderPaginations(products);
    renderProducts(products);
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
function changePageProduct(){
    localStorage.removeItem("detail_product");
    window.location.href="http://127.0.0.1:5500/user/pages/shop.html";
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
// function changePageSize(e) {
//     pageSize = e.target.value;
//     currentPage = 1;
//     render();
// }
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
// function timeAgo(date) {
//     const seconds = Math.floor((new Date() - date) / 1000);

//     const interval = Math.floor(seconds / 31536000);

//     if (interval > 1) {
//         return interval + " years ago";
//     }
//     if (interval === 1) {
//         return interval + " year ago";
//     }

//     const months = Math.floor(seconds / 2628000);
//     if (months > 1) {
//         return months + " months ago";
//     }
//     if (months === 1) {
//         return months + " month ago";
//     }

//     const days = Math.floor(seconds / 86400);
//     if (days > 1) {
//         return days + " days ago";
//     }
//     if (days === 1) {
//         return days + " day ago";
//     }

//     const hours = Math.floor(seconds / 3600);
//     if (hours > 1) {
//         return hours + " hours ago";
//     }
//     if (hours === 1) {
//         return hours + " hour ago";
//     }

//     const minutes = Math.floor(seconds / 60);
//     if (minutes > 1) {
//         return minutes + " minutes ago";
//     }
//     if (minutes === 1) {
//         return minutes + " minute ago";
//     }

//     return "just now";
// }

// const today = new Date();
// const yyyy = today.getFullYear();
// let mm = today.getMonth() + 1; 
// let dd = today.getDate();
// let hh = today.getHours();
// let minute = today.getMinutes();
// let seconds = today.getSeconds();
// if (dd < 10) dd = '0' + dd;
// if (mm < 10) mm = '0' + mm;
// if (hh < 10) hh = '0' + hh;
// if (minute < 10) minute = '0' + minute;
// if (seconds < 10) seconds = '0' + seconds;
// let abc = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + minute + ':' +seconds; 
// console.log(abc);
// const date = new Date(abc);
// const timeAgoString = timeAgo(date);
// console.log(timeAgo(date));
// console.log(today);