
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
const exitBoxLogin = document.querySelector(".exit-box-login");


loginUser.addEventListener("click", () =>{
    loginPage.classList.toggle("hide")
})
exitBoxLogin.addEventListener("click", () =>{
    loginPage.classList.toggle("hide")
})

//toggle create account page

const createAccountBtn = document.querySelector(".create-account-btn");
const createAccountPage = document.querySelector(".create-account-page");
const exitBoxAccount = document.querySelector(".exit-box-account")

createAccountBtn.addEventListener("click", () =>{
   loginPage.classList.toggle("hide");
   createAccountPage.classList.toggle("hide")
})

exitBoxAccount.addEventListener("click", () =>{
    createAccountPage.classList.toggle("hide")
})
// submit form events

const myFormLogin = document.querySelector(".my-form-login");
const myFormAccount = document.querySelector(".my-form-account")

myFormLogin.addEventListener("submit", (e)=>{
    e.preventDefault();
    
})

let userNameshown = document.querySelector(".user-logged-in")

myFormAccount.addEventListener("submit", (e) =>{
    e.preventDefault();

    // spara ny användare i local storage

    let firstName = document.querySelector("#first-name-account")
    let lastName = document.querySelector("#last-name-account")
    let address = document.querySelector("#address")
    let zipCode = document.querySelector("#zip-code")
    let email = document.querySelector("#e-mail-account")
    let password = document.querySelector("#password-account")
    let confirmPassword = document.querySelector("#confirm-password")
    let phone = document.querySelector("#phone-number")

    let userObj = {
        name: `${firstName.value} ${lastName.value}`,
        loggedin: true,
        address: address.value,
        zipCode: zipCode.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        cart: []
    }
    
    //kod som ändrar guest till false

    let indexOfUserLoggedIn = userArray.findIndex(object => {
        return object.loggedin == true
    })

    userArray[indexOfUserLoggedIn].loggedin = false

    userArray.push(userObj)
    localStorage.setItem("users", JSON.stringify(userArray))

    userNameshown.innerText = userObj.name

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

// load guest (from json) in local storage

const getGuest = async () => {
    const response = await fetch("guest-user.json")
    const data = await response.json()
    return data
}

let userArray = []

// check if guest exists in local storage

let storedUser = JSON.parse(localStorage.getItem("users"))

if (storedUser){
    userArray = [...storedUser]

} else { // load guest into json

    getGuest().then(data => {
        userArray.push(data.users[0])
    
        localStorage.setItem("users", JSON.stringify(userArray))
    
    })
}


