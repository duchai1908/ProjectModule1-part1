let opForm = document.getElementById("opForm");
let tbody = document.getElementById("tbody");
let textSearch ="";
const CATEGORY = "Category_01";
let realProducts = JSON.parse(localStorage.getItem(CATEGORY)) || [];
render(realProducts);
function openForm() {
    opForm.classList.remove('hidden');
}
function closeForm() {
    opForm.classList.add('hidden');
}
function submitForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
        values[name] = value;
    }
    const categories = JSON.parse(localStorage.getItem(CATEGORY)) || [];
    let id = 1;
    if (categories.length > 0) {
        id = categories[categories.length - 1].id + 1;
    }
    values.id = id;
    values.status = true;
    categories.push(values);
    localStorage.setItem(CATEGORY, JSON.stringify(categories));
    let cate = JSON.parse(localStorage.getItem(CATEGORY)) || [];
    e.target.reset();
    closeForm();
    render(cate);
}
function render(products){
    let stringHTML ="";
    for(var i=0;i<products.length;i++){
        stringHTML += 
        `
        <tr>
            <td>${products[i].id}</td>
            <td>${products[i].name}</td>
            <td>${products[i].status ? "Active" : "Block"}</td>
            <td>
                <button onclick ="updateForm(${products[i].id})">Edit</button>
                <button onClick="changeStatus(${i})">${products[i].status ? "Block" : "Active"}</button>
                <button onclick ="delForm(${products[i].id})">Del</button>
            </td>
        </tr>
        `
    }
    tbody.innerHTML=stringHTML;
}
function changeTextSearch(e){
    textSearch = e.target.value.toLowerCase();
    let cate = JSON.parse(localStorage.getItem(CATEGORY)) || [];
    cate = cate.filter(category => category.name.toLowerCase().includes(textSearch));
    render(cate);
}