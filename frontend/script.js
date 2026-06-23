let count= 0;
const buttons= document.querySelectorAll(".cart-btn");
const cartBtn= document.getElementById("cart-btn");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        count++;
        cartBtn.textContent = "Cart (" + count + ")";
        alert("Product Added To Cart");
    });

});
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email === "" || password === "") {
        alert("Please fill all fields");
    } else {
        alert("Login Successful");
    }
}