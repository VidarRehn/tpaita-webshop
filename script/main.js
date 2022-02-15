
// toggle hamburger

const navLinks = document.querySelector(".navlinks")
const hamburger = document.querySelector(".navbar")

// toggle shopping cart
const shoppingCartIcon = document.querySelector(".fa-shopping-cart")
const shoppingCart = document.querySelector(".shopping-cart-popup")

hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("hide") 
})


shoppingCartIcon.addEventListener("click", () => {
    shoppingCart.classList.toggle("hide")
})