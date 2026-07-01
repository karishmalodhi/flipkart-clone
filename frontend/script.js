let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount(){
    const cartCount = document.getElementById("cartCount");
    if(cartCount){
        cartCount.innerText = cart.length;
    }
}
updateCartCount();

document.querySelectorAll(".card").forEach(card => {

    const btn = card.querySelector(".add-to-cart");

    if(btn){
btn.addEventListener("click", () => {

    const name = card.querySelector("h3").innerText;
    const price = card.querySelector(".price").innerText;
    const image = card.querySelector("img");

    cart.push({
        name,
        price,
        image: image.src,
        qty: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    // flyToCart(image);
    showToast("Added to Cart 🛒");

    btn.innerText = "Added ✓";
    btn.style.background = "green";

    setTimeout(() => {
        btn.innerText = "Add To Cart";
        btn.style.background = "#ff9f00";
    }, 800);

});

    }

});

const searchInput = document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("input", function(){

        let value = this.value.toLowerCase().trim();

        document.querySelectorAll(".card").forEach(card => {

            let title = card.querySelector("h3").innerText.toLowerCase();

            card.style.display = title.includes(value) ? "block" : "none";

        });

    });

}

const categories = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".card");

categories.forEach(cat => {

    cat.addEventListener("click", () => {

        let value = cat.getAttribute("data-category");

        categories.forEach(c => c.classList.remove("active"));
        cat.classList.add("active");

        cards.forEach(card => {

            let type = card.getAttribute("data-category");

            if(value === "all"){
                card.style.display = "block";
            } else {
                card.style.display = (type === value) ? "block" : "none";
            }

        });

    });

});

let user = localStorage.getItem("user");

const userBox = document.getElementById("userNameDisplay");

if(user && userBox){
    userBox.innerText = "Hi, " + user;
}

const placeOrderBtn = document.getElementById("placeOrderBtn");

if(placeOrderBtn){

    placeOrderBtn.addEventListener("click", () => {

        if(cart.length === 0){
            alert("Cart is empty!");
            return;
        }

        let total = 0;

        cart.forEach(item => {
            let price = parseInt(item.price.toString().replace(/[^\d]/g, ""));
            total += price * item.qty;
        });

        alert("Order Placed 🎉\nTotal: ₹" + total);

    localStorage.removeItem("cart");
cart = [];
updateCartCount();
showToast("Order Placed 🎉");

    });

}
document.querySelectorAll(".card").forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
        card.style.transition = "0.5s";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }, 100);
});
function showToast(msg){
    let toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1500);

}
function flyToCart(img){

    let flyingImg = img.cloneNode(true);
    flyingImg.classList.add("flying-img");
    document.body.appendChild(flyingImg);

    let rect = img.getBoundingClientRect();
    let cart = document.getElementById("cartIcon").getBoundingClientRect();

    flyingImg.style.left = rect.left + "px";
    flyingImg.style.top = rect.top + "px";

    setTimeout(() => {
        flyingImg.style.left = cart.left + "px";
        flyingImg.style.top = cart.top + "px";
        flyingImg.style.width = "20px";
        flyingImg.style.height = "20px";
        flyingImg.style.opacity = "0";
    }, 50);

    setTimeout(() => {
        flyingImg.remove();
    }, 900);
}