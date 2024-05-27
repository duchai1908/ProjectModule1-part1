let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
let textSearch = "";
const USER = "user";
const listUser = document.getElementById("list-user");
const pageList = document.getElementById("page-list");
let categoryFilter = 'All';
function render() {
    let user = JSON.parse(localStorage.getItem(USER)) || [];
    if (categoryFilter !== 'All' && categoryFilter == 1) {
        // user = user.sort((a,b) => b.name.localeCompare(a.name));
        user = user.sort((a, b) => a.name < b.name ? -1 : (a.name < b.name ? 1 : 0))
    }else if(categoryFilter !== 'All' && categoryFilter == 2){
        // user = user.sort((a,b) => a.name.localeCompare(b.name));
        user = user.sort((a, b) => a.name > b.name ? -1 : (a.name > b.name ? 1 : 0))
    }
    user = user.filter((item) =>
        item.name.toLowerCase().includes(textSearch)
    );
    renderPaginations(user);
    renderProducts(user);
}
function renderPaginations(user) {
    totalPage = Math.ceil(user.length / pageSize); //làm trên lên
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
function renderProducts(user) {

    // user = user.sort((a,b) => b.name.localeCompare(a.name));
    // objs.sort((a, b) => a.last_nom.localeCompare(b.last_nom));


    let stringHTML = "";
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    if (end > user.length) {
        end = user.length;
    }
    for (let i = start; i < end; i++) {
        stringHTML += `
        <tr class="odd gradeX" align="center">
            <td>${user[i].id}</td>
            <td>${user[i].name}</td>
            <td>${user[i].email}</td>
            <td>${user[i].status ? "Active" : "Block"}</td>
            <td>  <button type="button" class="btn btn-primary" onClick="changeStatus(${i})">${user[i].status
                ? '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>'
                : '<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>'
            }</button>
            </td>
        </tr>
        `;
    }
    listUser.innerHTML = stringHTML;
}
function changeStatus(i) {
    let user = JSON.parse(localStorage.getItem(USER));
    user[i].status = !user[i].status;
    localStorage.setItem(USER, JSON.stringify(user));
    render();
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
render();
function sortName(e) {
    categoryFilter = e.target.value;
    currentPage = 1;
    render();
}