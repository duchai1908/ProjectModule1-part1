var qty = document.getElementById("qty");
var plus = document.getElementById("btnplus");
var minus = document.getElementById("btnminus");
var calculate = document.getElementById("calculate");
var updatetotal = document.getElementById("updateTotal");
var remove_cart = document.getElementsByClassName("btn-del");
let cartBody = document.getElementById("cart-body");
let cartDetail = document.getElementById("cart-details");
renderCart();
calculate.addEventListener("click",function(e){
    e.preventDefault();
    updatetotal.classList.toggle("update-totals");
})
/* ===============Render Cart=============== */
function renderCart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if(cart.length > 0){
        let stringHTML ="";
        var total = 0;
        for(let i = 0; i< cart.length; i++){
            total += cart[i].price * cart[i].qty;
            stringHTML += `
            <tr>
                <td><a style="cursor:pointer; color: red;" class="btn-del" onclick="removeCartItem(${cart[i].id})">X</a></td>
                <td><img src="${cart[i].image}" style="width: 80px; height: 80px;"></td>
                <td>${trimString(cart[i].name,30)}</td>
                <td>${formatMoney(cart[i].price)}</td>
                <td>
                    <div class="cart-qty">
                        <button class="btn btn-cart" id="btnminus" onclick="quantityProduct(${i},${cart[i].qty -1})">-</button>
                        <input type="number" min="1" value="${cart[i].qty}">
                        <button class="btn btn-cart" id="btnplus" onclick="quantityProduct(${i},${cart[i].qty +1})">+</button>
                    </div>
                </td>
                <td>${formatMoney(cart[i].price * cart[i].qty)}</td>
            </tr>
        
            `;
        } 
        let stringTotal = `
        <tr>
            <td>Total: </td>
            <td>${formatMoney(total)}</td>
            <input type="hidden" value="${total}" id="totalCart">
        </tr>
        `
        let subStringHTML = 
        `
            <tr>
                <td colspan="6">
                    <div class="check-cart">
                        Coupon:
                        <input type="text" class="coupon" placeholder="Nhap coupon">
                        <button class="btn btn-check">Apply Code</button>
                        <button class="btn btn-check" type="button" onclick="checkout()">Check Out</button>
                        <button class="btn btn-check"  type="button" onclick="removeAllCart()">Remove Cart</button>
                    </div>
                </td>
            </tr>
        `;
        cartBody.innerHTML = stringHTML + stringTotal + subStringHTML;
    }else{
        let stringCart = `
        <div class="emptyCart">
            <img src="/img/empty-cart.webp">
        </div>
            
        `
        cartDetail.innerHTML = stringCart;
    }
    
}
/*==================change quantity button =====================*/
function quantityProduct(index, newQuantity){
    let cartId = JSON.parse(localStorage.getItem("cart")) || [];
    if(newQuantity == 0){
        minus.classList.add("readOnly");    
    }else{
        cartId[index].qty = newQuantity;
    }
    localStorage.setItem("cart", JSON.stringify(cartId));
    renderCart();
    bill();
}

/*======================Check Out ========================*/
function checkout(){
    let checkUser = JSON.parse(localStorage.getItem("user_login")) || {};
    // Check Login
    if(Object.keys(checkUser).length > 0){
        let totalCart = document.getElementById("totalCart")
        let userId = JSON.parse(localStorage.getItem("user_login")) || [];
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let order = JSON.parse(localStorage.getItem("order")) || [];
        let check =1;
        let status =1;
        // Check Order code exists 
        do{
            var randomCode =  Math.floor(Math.random() * 1000001);
            if(order.length>0){
                for(let i in order){
                    if(order[i].cartOrder == randomCode){
                        check = 0;
                        break;
                    }
                }
            }
        }while(check == 0)
        // Add Order
        const orderList = {
            id: (order.length > 0)? order[order.length-1].id +1 : 1,
            cartList: cart,
            idUser: userId.id,
            cartOrder: randomCode,
            total: +totalCart.value,
            dateTime:formatDate(),
            status,
        }
        order.push(orderList);
        localStorage.setItem("order",JSON.stringify(order));
        Swal.fire({
            title: "Order Success \n your order code is "+randomCode,
            text: "Thank you for purchasing our goods, we will deliver them to you as soon as possible",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
            localStorage.removeItem("cart");
            window.location.reload();
            }
        });
    }else{
        Swal.fire({
            title: "You are not logged in!",
            text: "Login to checkout your cart",
            icon: "info"
          });
    }
}
/*=========================Bill======================== */
bill();
function bill(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
        for(let i in cart){
            total += cart[i].price * cart[i].qty;
        }
        let cartBill = document.getElementById("cartBill");
        let stringHTML =`
            <tr>
                <th>Cart Subtotal</th>
                <td>${formatMoney(total)}</td>
            </tr>
            <tr>
                <th>Shipping and Handling</th>
                <td>Free Shipping</td>
            </tr>
            <tr>
                <th>Order Total</th>
                <td>${formatMoney(total)}</td>
            </tr>
        `;
        cartBill.innerHTML = stringHTML;
}
/*=======================Related Products===========================*/
relatedProducts();
function relatedProducts(){
    let relatedProducts = document.getElementById("relatedProducts");
    let singleProduct = JSON.parse(localStorage.getItem("single_product")) || {};
    let product = JSON.parse(localStorage.getItem("product")) || [];
    let indexProduct = product.findIndex(item => item.id == singleProduct.product_id);
    let categoryId = product[indexProduct]["category-id"];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let stringHTML = "";
        if(Object.keys(singleProduct).length>0){
            product = product.filter(product => product["category-id"] == categoryId);
            for(let i =0; i<2; i++){
                stringHTML+= `
                <div class="cart-product">
                    <div class="cartRelated">
                        <img src="${product[i].image}" alt="" >
                    </div>
                    <div class="cart-product-detail">
                        <p>${trimString(product[i].name,20)}</p>
                        <p>${formatMoney(product[i].price)}</p>
                        <button class="btn">See Detail</button>
                    </div>
                </div>
                `;
            }
        }else{
            for(let i = 0; i < 2; i++){
                stringHTML+= `
                <div class="cart-product">
                    <div class="cartRelated">
                        <img src="${product[i].image}" alt="" >
                    </div>
                    <div class="cart-product-detail">
                        <p>${trimString(product[i].name,20)}</p>
                        <p>${formatMoney(product[i].price)}</p>
                        <button class="btn">See Detail</button>
                    </div>
                </div>
                `;
            }
        }
        relatedProducts.innerHTML = stringHTML;
}
/*======================Remove Cart Item ======================*/
function removeCartItem(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let indexCart = cart.findIndex((item) => item.id == id);
    cart.splice(indexCart,1);
    localStorage.setItem("cart",JSON.stringify(cart));
    renderCart();
    bill();
}
/*======================Remove All Cart ======================*/
function removeAllCart(){
    localStorage.removeItem("cart");
    renderCart();
    bill();
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
function formatDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
}
function changePageProduct(){
    localStorage.removeItem("detail_product");
    window.location.href="http://127.0.0.1:5500/user/pages/shop.html";
}
// test();
// function test(){
//     const value = [{
//         id:1,
//         name: "No Process" 
//     },{
//         id:2,
//         name: "Processing" 
//     },{
//         id:3,
//         name: "Done" 
//     },{
//         id:4,
//         name: "Cancel" 
//     }
//     ];
//     localStorage.setItem("check",JSON.stringify(value));
// }

