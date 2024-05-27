const CATEGORY = "category";
const formCate = document.getElementById("form-category-add");
let categoryItem = JSON.parse(localStorage.getItem(CATEGORY)) || [];
formCate.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
        values[name] = value;
    }
    values.id = (categoryItem.length >0) ? categoryItem[categoryItem.length-1].id +1 : 1;
    categoryItem.push(values);
    localStorage.setItem(CATEGORY,JSON.stringify(categoryItem));
    Swal.fire({
        title: "Good job!",
        text: "Create category success",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href="../../pages/category/list.html";
        }
      });
})