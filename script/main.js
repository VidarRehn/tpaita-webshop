
// toggle hamburger

const navLinks = document.querySelector(".navlinks")
const hamburger = document.querySelector(".navbar")

hamburger.addEventListener("click", () => {
    if(shoppingCart.classList.contains("hide")){
        navLinks.classList.toggle("hide")
    }else{
        navLinks.classList.toggle("hide")
        shoppingCart.classList.toggle("hide") 
    }
})


// toggle shopping cart
const shoppingCartIcon = document.querySelector(".fa-shopping-cart")
const shoppingCart = document.querySelector(".shopping-cart-popup")

shoppingCartIcon.addEventListener("click", () => {
    if(navLinks.classList.contains("hide")){
        shoppingCart.classList.toggle("hide")
    }else{
        shoppingCart.classList.toggle("hide")
        navLinks.classList.toggle("hide") 
    }
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