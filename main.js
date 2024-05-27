
/*===================== NEW PRODUCT=====================*/
const PRODUCT = "product";

function latestProduct(){
    let stringHTML = "";
    let lateProduct = JSON.parse(localStorage.getItem(PRODUCT)) || [];
    let reviewBox = document.getElementById("slider-carousel");
    for(let i = 0; i<lateProduct.length; i++ ){
        stringHTML+= `
            <div class="box">
                <div class="image">
                    <img
                        src="${lateProduct[i].image}"
                        alt=""
                    />
                </div>
                <div class="name">${lateProduct[i].name}</div>
                <div class="designation"><a href="">Student</a></div>
                <div class="text">
                 ${trimString(lateProduct[i].description,300)}
                </div>
             </div>
        `
    }
    reviewBox.innerHTML = stringHTML;
// reviewBox.innerHTML = "oke";
}
latestProduct();

/*================================ SWIPER===========================*/
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
/*============================SLIDER NEW PRODUCT===========================*/
const listBox = document.querySelectorAll('.box');
const wrapperBox = document.querySelector('.review-box');
const btnLeft = document.querySelector('.btnLeft');
const btnRight = document.querySelector('.btnRight');
const reviewDiv = document.querySelector('.review');
document.addEventListener('DOMContentLoaded', function () {
    // responsive
    // const scrollbarWidth =
    //     window.innerWidth - document.documentElement.clientWidth;

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1366) {
            make_slide(3);
        } else if (window.innerWidth >= 992) {
            make_slide(2);
        } else {
            make_slide(1);
        }
    });

    const media = [
        window.matchMedia('(min-width: 1366px)'),
        window.matchMedia('(min-width: 992px)'),
    ];

    if (media[0].matches) {
        make_slide(5);
    } else if (media[1].matches) {
        make_slide(4);
    } else {
        make_slide(3);
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
/*=========================CAROUSEL===========================*/
$('.owl-carousel').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout: 4000,
    autoplayHoverPause:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})
/*==========================PHONE========================*/
const PHONE = "Phone";
const CATEGORY = "category";
const LAPTOP = "Laptop";
const HEADPHONE = "Head phone"
renderPhone();
function renderPhone(){
    let phoneProduct = document.getElementById("phone-product");
    let allPhone = JSON.parse(localStorage.getItem(CATEGORY)) || [];
    let findPhone = allPhone.findIndex(item =>item.name == PHONE);
    let cateId = allPhone[findPhone].id;
    let allProduct = JSON.parse(localStorage.getItem(PRODUCT)) || [];
    allProduct = allProduct.filter(product => product["category-id"] == cateId);
    let stringsub = `
    <div class="wid-view">
        <h2 class="product-wid-title">Phone</h2>
    <a style="cursor: pointer;" class="wid-view-more" onclick="movetocategory(${cateId})">View All</a>
    </div>`;
    let stringHTML = "";
    for(let i = 0; i< allProduct.length; i++){
        stringHTML += `
                <div class="product-view">
                    <div class="img-view">
                        <a style="cursor:pointer;" onclick = "movetoSingle(${allProduct[i].id})"><img src="${allProduct[i].image}" alt="" class="product-thumb"></a>
                    </div>
                    <div class="details-view">
                        <p><a style="cursor:pointer;" onclick = "movetoSingle(${allProduct[i].id})">${trimString(allProduct[i].name,20)}</a></p>
                        <div class="product-wid-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div class="product-wid-price">
                            <ins>${formatMoney(allProduct[i].price)}</ins>
                        </div>                
                    </div>
                </div>
        `;
    }
    phoneProduct.innerHTML = stringsub + stringHTML;    
}
/*=============================LAPTOP==================================*/
renderLaptop();
function renderLaptop(){
    let laptop = document.getElementById("laptop-product");
    let allLaptop = JSON.parse(localStorage.getItem(CATEGORY)) || [];
    let findLap = allLaptop.findIndex(item =>item.name == LAPTOP);
    let cateId = allLaptop[findLap].id;
    let allProduct = JSON.parse(localStorage.getItem(PRODUCT)) || [];
    allProduct = allProduct.filter(product => product["category-id"] == cateId);
    let stringsub = `
    <div class="wid-view">
        <h2 class="product-wid-title">Laptop</h2>
    <a style="cursor: pointer;" class="wid-view-more" onclick="movetocategory(${cateId})">View All</a>
    </div>`;
    let stringHTML = "";
    for(let i = 0; i< allProduct.length; i++){
        stringHTML += `
                <div class="product-view">
                    <div class="img-view">
                        <a style="cursor:pointer;" onclick = "movetoSingle(${allProduct[i].id})"><img src="${allProduct[i].image}" alt="" class="product-thumb"></a>
                    </div>
                    <div class="details-view">
                        <p><a style="cursor:pointer;" onclick = "movetoSingle(${allProduct[i].id})">${trimString(allProduct[i].name,20)}</a></p>
                        <div class="product-wid-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div class="product-wid-price">
                            <ins>${formatMoney(allProduct[i].price)}</ins>
                        </div>                
                    </div>
                </div>
        `;
    }
    laptop.innerHTML = stringsub + stringHTML; 
}
/*===============================HEADPHONE===================================*/

renderHeadphone();
function renderHeadphone(){
    let headPhone = document.getElementById("headphone-product");
    let allHeadphone = JSON.parse(localStorage.getItem(CATEGORY)) || [];
    let findHeadphone = allHeadphone.findIndex(item =>item.name == HEADPHONE);
    let cateId = allHeadphone[findHeadphone].id;
    let allProduct = JSON.parse(localStorage.getItem(PRODUCT)) || [];
    allProduct = allProduct.filter(product => product["category-id"] == cateId);
    let stringsub = `
    <div class="wid-view">
        <h2 class="product-wid-title">Headphone</h2>
    <a style="cursor: pointer;" class="wid-view-more" onclick="movetocategory(${cateId})">View All</a>
    </div>`;
    let stringHTML = "";
    for(let i = 0; i< allProduct.length; i++){
        stringHTML += `
                <div class="product-view">
                    <div class="img-view">
                        <a style="cursor:pointer;" onclick = "movetoSingle(${allProduct[i].id})"><img src="${allProduct[i].image}" alt="" class="product-thumb"></a>
                    </div>
                    <div class="details-view">
                        <p><a style="cursor:pointer;" onclick = "movetoSingle(${allProduct[i].id})">${trimString(allProduct[i].name,20)}</a></p>
                        <div class="product-wid-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div class="product-wid-price">
                            <ins>${formatMoney(allProduct[i].price)}</ins>
                        </div>                
                    </div>
                </div>
        `;
    }
    headPhone.innerHTML = stringsub + stringHTML; 
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
function trimString(string, length) {
    return string.length > length ? 
           string.substring(0, length) + '...' :
           string;
};
function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}
function movetocategory(id){
    let value = {};
    value ={
        cate: id,
    }
    localStorage.setItem("detail_product", JSON.stringify(value));
    window.location.href="http://127.0.0.1:5500/user/pages/shop.html";
}
function movetoSingle(id){
    let value = {};
        value ={
            product_id: id,
        }
    localStorage.setItem("single_product", JSON.stringify(value));
    window.location.href="http://127.0.0.1:5500/user/pages/single-product.html";
}
function changePageProduct(){
    localStorage.removeItem("detail_product");
    window.location.href="http://127.0.0.1:5500/user/pages/shop.html";
}