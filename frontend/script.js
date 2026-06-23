let count = 0;

const cartBtn = document.getElementById("cart-btn");

const buttons = document.querySelectorAll(".cart-btn");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        count++;

        cartBtn.innerText = `Cart (${count})`;

        alert("Product Added To Cart");

    });

});
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
    let searchValue = document.querySelector(".search-box input").value;

    if(searchValue === ""){
        alert("Please enter something to search");
    } else {
        alert(`Searching for ${searchValue}`);
    }
});
const categories = document.querySelectorAll(".category");

categories.forEach(category => {
    category.addEventListener("click", () => {
        alert(`${category.innerText} selected`);
    });
});
document.getElementById("shop-now").addEventListener("click", () => {
    window.scrollTo({
        top: 500,
        behavior: "smooth"
    });
});
document.getElementById("theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});