
/*=================Change Sub Pic================*/
function changePic(imgs){
    let expandImg = document.getElementById("expandedImg");
    expandImg.src = imgs.src;
}
/*===========================Show Detail Single Product===========================*/
showDeltail();
function showDeltail(){
    let singleDetailId = JSON.parse(localStorage.getItem("single_product")) || {};
    let product = JSON.parse(localStorage.getItem("product"));
    let findIndexSingle = product.findIndex(item =>item.id == singleDetailId.product_id );
    let mainContent = document.getElementById("main-content-detail");
    let stringHTML = 
    `
            <div class="single-product-img">
                <div class="main-img">
                    <img id="expandedImg" src="${product[findIndexSingle].image}" alt="">
                </div>
                <div class="sub-img">
                    <img src="../../img/product-thumb-1.jpg" alt="" onclick = "changePic(this);">
                    <img src="../../img/product-thumb-2.jpg" alt="" onclick = "changePic(this);">
                    <img src="../../img/product-thumb-3.jpg" alt="" onclick = "changePic(this);">
                </div>
            </div>
            <div class="single-product-info">
                <h2>${product[findIndexSingle].name}</h2>
                <div class="product-inner-price">
                    <ins>${formatMoney(product[findIndexSingle].price)}</ins>
                </div> 
                <form  class="single-cart">  
                    <div class="cart-submit">
                        <input type="number" size="4" class="numberCart" id="quantity" title="Qty" value="1" name="quantity" min="1" step="1">
                        <button class=" btn add_to_cart_button" type="button" onclick = "addtoCart(${product[findIndexSingle].id})">ADD TO CART</button>
                    </div>
                    <div class="cart-submit cart-wishlish">
                        <button class=" btn" type="button" onclick = "addtoWishlish(${product[findIndexSingle].id})">ADD TO WISHLISH</button>
                    </div>                           
                </form>
                <div class="product-inner-category">
                    <p>Category: <a href="">Summer</a>. Tags: <a href="">awesome</a>, <a href="">best</a>, <a href="">sale</a>, <a href="">shoes</a>. </p>
                </div>
                <div class="tabpanel">
                    <ul class="panel-list">
                        <li class="panel-item active" id="panel-item"><a class="panel-link" >Description</a></li>
                        <li class="panel-item" id="panel-item1" ><a class="panel-link" >Review</a></li>
                    </ul>
                </div>
                <div class="tab-content">
                    <div class="tab-1" id ="tab-1">
                        <h2>Product Description</h2>
                        ${product[findIndexSingle].description}
                    </div>
                    <div class="tab-2 hidden" id="tab-2">
                        <h2>Reviews</h2>
                        <form class="reviews" id="reviewProduct">
                            <p>Name</p>
                            <input type="text" name="name">
                            <p>Email</p>
                            <input type="email" name="email">
                            <p>Your rating</p>
                            <div class="rating-wrap-post">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <p>Your revidew</p>
                            <textarea name="comment"></textarea>
                            <p><button class="btn" type="submit" >Send</button></p>
                        </form>
                    </div>    
                </div>
            </div>    
    `;
    mainContent.innerHTML= stringHTML;
}
//Sub pic
var a = document.getElementById("panel-item");
var b = document.getElementById("panel-item1");
var c = document.getElementById("tab-1");
var d = document.getElementById("tab-2")
/*==================== hidden Review==================*/
a.onclick=function(){
    a.classList.add("active");
    b.classList.remove("active");
    d.classList.add("hidden");
    c.classList.remove("hidden");
};
b.onclick = function(){
    a.classList.remove("active");
    b.classList.add("active");
    c.classList.add("hidden");
    d.classList.remove("hidden");
};
/*=================================Show related products=================================*/
relatedProduct();
function relatedProduct(){
    let reviewbox = document.getElementById("review-box");
    let singleDetailId = JSON.parse(localStorage.getItem("single_product")) || {};
    let product = JSON.parse(localStorage.getItem("product"));
    let findIndexSingle = product.findIndex(item =>item.id == singleDetailId.product_id );
    let singleProductCate = product[findIndexSingle]["category-id"];
    product = product.filter(item => item["category-id"] == singleProductCate);
    let stringHTML = "";
    for(let i = 0; i< product.length; i++){
    stringHTML += `
        <div class="single-product">
            <div class="product-f-image">
                <img src="${product[i].image}" alt="">
                <div class="product-hover">
                    <a style="cursor: pointer;" class="add-to-cart-link" onclick="addtoCartDefault(${product[i].id})"><i class="fa fa-shopping-cart""></i> Add to cart</a>
                    <a class="view-details-link" style="cursor:pointer;" onclick = "movetoSingle(${product[i].id})"><i class="fa fa-link"></i> See details</a>
                </div>
            </div>
            
            <h2>${product[i].name}</h2>
            
            <div class="product-carousel-price">
                <ins>${product[i].price}</ins>
            </div>
        </div>
    `;
    }
    reviewbox.innerHTML =stringHTML;
}

/*======================Add to cart with quantity==========================*/
function addtoCart(id){
    let qty = document.getElementById("quantity").value;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = JSON.parse(localStorage.getItem("product"));
    let indexProduct = product.findIndex(item => item.id == id);
    const cartItem = {};
        cartItem.id = (cart.length>0)? cart[cart.length-1].id +1: 1;
        cartItem.productId = id;
        cartItem.qty = +qty;
        cartItem.name = product[indexProduct].name;
        cartItem.image = product[indexProduct].image;
        cartItem.price = product[indexProduct].price;  
    if(cart.length>0){
        let check = true;
        for(let i in cart){
            if(cart[i].productId == id){
                cart[i].qty += +qty;
                localStorage.setItem("cart",JSON.stringify(cart));
                check = true;
                break;
            }else{
                check = false;
            }
        }
        if(!check){
            cart.push(cartItem);
        }
        localStorage.setItem("cart",JSON.stringify(cart));
    } else{
        cart.push(cartItem);
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    Swal.fire({
        title: "Success!",
        text: "The product has been added to cart!",
        icon: "success"
      });
    // qty=1;
}
/*======================Add to cart with default quantity==========================*/
function addtoCartDefault(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = JSON.parse(localStorage.getItem("product"));
    let indexProduct = product.findIndex(item => item.id == id);
    let qty = 1;
    const cartItem = {};
        cartItem.id = (cart.length>0)? cart[cart.length-1].id +1: 1;
        cartItem.productId = id;
        cartItem.qty = qty;
        cartItem.image = product[indexProduct].image;
        cartItem.name = product[indexProduct].name;
        cartItem.price = product[indexProduct].price;  
    if(cart.length>0){
        let check = true;
        for(let i in cart){
            if(cart[i].productId == id){
                cart[i].qty += +qty;
                localStorage.setItem("cart",JSON.stringify(cart));
                check = true;
                break;
            }else{
                check = false;
            }
        }
        if(!check){
            cart.push(cartItem);
        }
        localStorage.setItem("cart",JSON.stringify(cart));
    } else{
        cart.push(cartItem);
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    Swal.fire({
        title: "Success!",
        text: "The product has been added to cart!",
        icon: "success"
      });
    // qty=1;
}
/*==================Move to Single Product===================*/
function movetoSingle(id){
    let value = {};
        value ={
            product_id: id,
        }
    localStorage.setItem("single_product", JSON.stringify(value));
    window.location.href="http://127.0.0.1:5500/user/pages/single-product.html";
    
}


//Slide
const listBox = document.querySelectorAll('.single-product');
const wrapperBox = document.querySelector('.review-box');
const btnLeft = document.querySelector('.btnLeft');
const btnRight = document.querySelector('.btnRight');
const reviewDiv = document.querySelector('.review');

/*==========================Make Slides==============================*/
document.addEventListener('DOMContentLoaded', function () {
    // responsive
    // const scrollbarWidth =
    //     window.innerWidth - document.documentElement.clientWidth;
  
      window.addEventListener('resize', function () {
        if (window.innerWidth >= 1200) {
            make_slide(4);
        } else if (window.innerWidth >= 992) {
            make_slide(3);
        } else {
            make_slide(1);
        }
    });
  
    const media = [
        window.matchMedia('(max-width: 1366px)'),
        window.matchMedia('(min-width: 992px)'),
    ];
  
    if (media[0].matches) {
        make_slide(4);
    } else if (media[1].matches) {
        make_slide(3);
    } else {
        make_slide(1);
    }
  });
  
  function make_slide(amountSlideAppear) {
    // set width and margin for item slide
    const widthItemAndMargin = reviewDiv.offsetWidth / amountSlideAppear;
    let widthAllBox = widthItemAndMargin * listBox.length;
    wrapperBox.style.width = `${widthAllBox}px`;
  
    listBox.forEach((element) => {
        element.style.marginRight = '20px';
        element.style.width = `${widthItemAndMargin - 20}px`;
    });
  
    // handle slide
    let count = 0;
    let spacing = widthAllBox - amountSlideAppear * widthItemAndMargin;
    btnRight.addEventListener('click', function () {
        count += widthItemAndMargin;
  
        if (count > spacing) {
            count = 0;
        }
        wrapperBox.style.transform = `translateX(${-count}px)`;
    });
  
    btnLeft.addEventListener('click', function () {
        count -= widthItemAndMargin;
  
        if (count < 0) {
            count = spacing;
        }
        wrapperBox.style.transform = `translateX(${-count}px)`;
    });
  }

//reviewProduct
const reviewBox = document.getElementById("reviewProduct");
/*===================Post Comment Product============================*/
reviewBox.addEventListener('submit',(e)=>{
    e.preventDefault();
    //get Time
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();
    let hh = today.getHours();
    let minute = today.getMinutes();
    let seconds = today.getSeconds();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (minute < 10) minute = '0' + minute;
    if (seconds < 10) seconds = '0' + seconds;
    let timeToday = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + minute + ':' +seconds; 
    //get Single Product
    let singleProduct = JSON.parse(localStorage.getItem("single_product")) || {};
    //get Product
    let product = JSON.parse(localStorage.getItem("product")) || [];
    let indexProduct = product.findIndex(item=>item.id == singleProduct.product_id );
    //get Comment
    let comment = JSON.parse(localStorage.getItem("comment")) || [];
    //pust Comment
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
        values[name] = value;
    }
    values.id = (comment.length>0)? comment[comment.length-1].id +1 : 1;
    values.productId = +singleProduct.product_id;
    values.productName = product[indexProduct].name;
    values.productImage = product[indexProduct].image;
    values.dateTime = timeToday;
    comment.push(values);
    localStorage.setItem("comment",JSON.stringify(comment));
    Swal.fire({
        title: "Send Success",
        text: "Thank you for your review about our product, hope you will be happy ",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
    }).then((result) => {
        e.target.reset();
        render();
    });
});
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
/*====================Show Comment ========================*/
let pageSize = 4;
let totalPage = 1;
let currentPage = 1;
let pageList = document.getElementById("page-list");
render();
function render(){
    let productId = JSON.parse(localStorage.getItem("single_product")) || {};
    let comment = JSON.parse(localStorage.getItem("comment")) || [];
    comment = comment.filter(item=>item.productId == productId.product_id);
    renderPaginations(comment);
    showComment(comment.reverse());
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
function showComment(comment){
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize
    if (end > comment.length) {
        end = comment.length
    }
    let reviewProducts = document.getElementById("reviewProducts");
    let commentHead = `
    <h3 class="comment_product">
        Review Of Customer:
    </h3>
    `;
    let stringHTML = ``;
    for (let i = start; i < end; i++) {
        let date = new Date(comment[i].dateTime);
        stringHTML += `
            <div class="comment_group">
                <div class="comment_head">
                    <span class="comment_user">${comment[i].name}</span> <span class="comment_time">${timeAgo(date)}</span>
                </div>
                <div class="commet_title">
                    ${comment[i].comment}
                </div>
            </div>
        `;
    }
    reviewProducts.innerHTML = commentHead + stringHTML;
}
/*==================Pagination Comment========================*/
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
/*=====================Add to Wishlish========================*/
function addtoWishlish(id){
    let userLogin = JSON.parse(localStorage.getItem("user_login")) || {};
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let product = JSON.parse(localStorage.getItem("product")) ||[];
    product = product.find(item=>item.id == id);
    let idWishlist = (wishlist.length>0)? wishlist[wishlist.length-1].idWish +1 : 1;
    let value = {...product,userId: userLogin.id, idWish: idWishlist};
    if(Object.keys(userLogin).length >0){
        if(wishlist.length>0){
            let check = true;
            for(let i in wishlist){
                if(wishlist[i].id == id ){
                    check = true;
                    Swal.fire({
                        title: "This product already exists in your wishlish!",
                        text: "You can add another product",
                        icon: "info"
                      });
                      break;
                }else{
                    check = false;
                }
            }
            if(!check){
                wishlist.push(value);
                localStorage.setItem("wishlist",JSON.stringify(wishlist));
            }
        }else{
            wishlist.push(value);
            localStorage.setItem("wishlist",JSON.stringify(wishlist));
        }   
    }else{
        Swal.fire({
            title: "You are not logged in!",
            text: "Login to add this product into your Wishlish",
            icon: "info"
          });
    }
}
/*=================Time Ago=========================*/
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    const interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    if (interval === 1) {
        return interval + " year ago";
    }

    const months = Math.floor(seconds / 2628000);
    if (months > 1) {
        return months + " months ago";
    }
    if (months === 1) {
        return months + " month ago";
    }

    const days = Math.floor(seconds / 86400);
    if (days > 1) {
        return days + " days ago";
    }
    if (days === 1) {
        return days + " day ago";
    }

    const hours = Math.floor(seconds / 3600);
    if (hours > 1) {
        return hours + " hours ago";
    }
    if (hours === 1) {
        return hours + " hour ago";
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes > 1) {
        return minutes + " minutes ago";
    }
    if (minutes === 1) {
        return minutes + " minute ago";
    }

    return "just now";
}

function trimString(string, length) {
    return string.length > length ? 
           string.substring(0, length) + '...' :
           string;
};
function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}
function changePageProduct(){
    localStorage.removeItem("detail_product");
    window.location.href="http://127.0.0.1:5500/user/pages/shop.html";
}
  