const COMMENT = "comment";
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
let textSearch = "";
let categoryFilter = "All";
const tbodyHTML = document.getElementById("list-comment");
const pageList = document.getElementById("page-list");
const reviewProduct = document.getElementById("code");
/*========================Render Comment List ==========================*/
render();
function render(){
    let commentProduct = JSON.parse(localStorage.getItem(COMMENT)) || [];
        commentProduct = commentProduct.filter((item) =>
        item.productName.toLowerCase().includes(textSearch)
    );
    renderPaginations(commentProduct);
     renderProducts(commentProduct);
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
        var date = new Date(orders[i].dateTime);
        stringHTML += `
        <tr class="odd gradeX" align="center">
            <td>${i+1}</td>
            <td><img width="52px" src="${orders[i].productImage}" alt="img"></td>
            <td>${orders[i].productName}</td>
            <td>${orders[i].name}</td>
            <td>${orders[i].email}</td>
            <td>${trimString(orders[i].comment,40)}</td>
            <td>${timeAgo(date)}</td>
            <td class="center">
            <button type="button" onclick="detailReview(${orders[i].id})" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i class="fa fa-eye fa-fw"></i></button>
            </td>
            <td class="center">
                <button type="button" onclick="deleteComment(${orders[i].id})" class="btn btn-danger"><i class="fa fa-trash-o  fa-fw"></i></button>
            </td>
        </tr>
        `;
    }
    tbodyHTML.innerHTML = stringHTML;
} 
function clickPage(i) {
    currentPage = i;
    render();
}

//B13 nhấn trái phải nút button
function changePage(status) {
    if (status === -1 && currentPage > 1) {
        currentPage -= 1;
    }
    if (status === 1 && currentPage < totalPage) {
        currentPage += 1;
    }
    render();
}
/*====================Detail Review ====================*/
function detailReview(id){
    let comment = JSON.parse(localStorage.getItem(COMMENT));
    let indexComment = comment.findIndex(item => item.id == id);
    reviewProduct.innerHTML = comment[indexComment].comment;
}
/*====================Delete Comment====================*/
function deleteComment(id){
    Swal.fire({
        title: "Are you sure to delete this?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            let comment = JSON.parse(localStorage.getItem(COMMENT));
            let indexComment = comment.findIndex(item => item.id == id);
            comment.splice(indexComment,1);
            localStorage.setItem(COMMENT,JSON.stringify(comment));
        Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          });
          render();
        }
      }); 
}
/*===================Search Comment====================*/
function changeTextSearch(event){
    textSearch = event.target.value.toLowerCase();
    currentPage = 1;
    render();
}
/*====================Time Ago=========================*/
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
//format String
function trimString(string, length) {
    return string.length > length ? 
           string.substring(0, length) + '...' :
           string;
};
