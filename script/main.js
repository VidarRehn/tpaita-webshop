
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

// get products from JSON

async function getProducts(){
    const response = await fetch("./products.json")
    const data = await response.json()
    return data;
}

// test json fetch

getProducts().then(data => {
    let products = data.products
    console.log(products);
})