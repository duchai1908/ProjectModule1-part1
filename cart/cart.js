const openCart = document.querySelector(".shopping");
const body = document.querySelector("body");
const closeCart = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const quantityCart = document.querySelector(".quantity");
const cart = document.querySelector(".listCard");
const total = document.querySelector(".total");

openCart.addEventListener("click", ()=>{
    body.classList.add("active");
});
closeCart.addEventListener("click", ()=>{
    body.classList.remove("active");
});
// let productData = [
//     {id:1, name:"come ga", price: 40000, image: "1.PNG"},
//     {id:2, name:"canh ga", price: 60000, image: "2.PNG"},
//     {id:3, name:"ca hoi", price: 150000, image: "3.PNG"},
//     {id:4, name:"sup bi do", price: 5000, image: "4.PNG"},
//     {id:5, name:"Salat", price: 7000, image: "5.PNG"},
//     {id:6, name:"Pizza", price: 8000, image: "6.PNG"},
// ];
// localStorage.setItem("listProduct",JSON.stringify(productData));
const listProduct = JSON.parse(localStorage.getItem("listProduct")) || [];
const listCart = JSON.parse(localStorage.getItem("listCart")) || [];
function renderData(){
    for(let i =0; i < listProduct.length; i++){
        var value = listProduct[i];
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML += `
            <img src="./image/${value.image}"/>
            <div class="title">${value.name}</div>
            <div class="price">${value.price}</div>
            <button onclick="addToCart(${i})">Add to cart</button>
        `;
        list.appendChild(newDiv);
    }
}
renderData();
function addToCart(index){
    if(listCart[index] == null){
        listCart[index] = {...listProduct[index], quantity: 1};
    }else{
        listCart[index].quantity += 1;
    }
    localStorage.setItem("listCart", JSON.stringify(listCart));
    renderCart()
}
function renderCart(){
    cart.innerHTML="";  
    let totalCount =0;
    let totalCart = 0;

    for(let i = 0; i< listCart.length; i++){
        const valueCart = listCart[i];
       if(valueCart != null){
        let newLi = document.createElement("li");
        newLi.innerHTML += `
            <img src="./image/${valueCart.image}">
            <div class="text-cart">${valueCart.name}</div>
            <div><button onclick="quantiryProduct(${i},${valueCart.quantity -1})">-</button></div>
            <div class="count">${valueCart.quantity}</div>
            <div><button onclick="quantiryProduct(${i},${valueCart.quantity +1})">+</button></div>
        `;
        cart.appendChild(newLi);
        totalCount += valueCart.price * valueCart.quantity;
        total.innerHTML = totalCount;
        totalCart++;
        quantityCart.textContent = totalCart;
       }
    }
    
}
renderCart();
function quantiryProduct(index, newQuantity){
    if(newQuantity <=0){
        delete listCart[index];
    }else{
        listCart[index].quantity = newQuantity;
    }
    localStorage.setItem("listCart", JSON.stringify(listCart));
    renderCart();
}

