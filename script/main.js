
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


// test json fetch

getProducts().then(data => {
    let products = data.products
    console.log(products);
})

// querystrings

let linksInNav = document.querySelector(".links")

let stringifyCategories = (categories) => {
    linksInNav.innerHTML = categories.map(category => {
        return `<a href="product-list.html?category=${category.category}">${category.category}</a>`
    }).join("")
}

getProducts().then(data => {
    stringifyCategories(data.products)
})


// fixing breadcrumbs

const breadcrumbCategory = document.querySelector("#breadcrumb-category")

const fillingBreadcrumbs = (jsondata) => {
    const params = new URLSearchParams(location.search)
    const category = params.get("category")

    if (category) {
        console.log(category);
        const currentCategory = jsondata.find(cat => {
            console.log(cat)
            return cat.category == category;
        })
        
        breadcrumbCategory.innerText = currentCategory.category
    }
}

getProducts().then(data => {
    fillingBreadcrumbs(data.products)
})


