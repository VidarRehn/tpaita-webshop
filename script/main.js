
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

// toggle login page
const loginPage = document.querySelector(".login-page");
const loginUser = document.querySelector(".fa-user");
const exitBox = document.querySelector(".exit-box-login");


loginUser.addEventListener("click", () =>{
    loginPage.classList.toggle("hide")
})
exitBox.addEventListener("click", () =>{
    loginPage.classList.toggle("hide")
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

// querystrings

const linksInNav = document.querySelector(".links")

const stringifyCategories = (categories) => {
    linksInNav.innerHTML = categories.map(category => {
        return `<a href="index.html?category=${category.category}">${category.category}</a>`
    }).join("")
}

getProducts().then(data => {
    stringifyCategories(data.products)
})