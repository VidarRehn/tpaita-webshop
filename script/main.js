// toggle hamburger

const navLinks = document.querySelector(".navlinks");
const hamburger = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
    if(shoppingCart.classList.contains("hide")){
        navLinks.classList.toggle("active")
    }else{
        navLinks.classList.toggle("active")
        shoppingCart.classList.toggle("hide") 
    }
    hamburger.firstElementChild.classList.toggle("is-active")
})


// toggle shopping cart
const shoppingCartIcon = document.querySelector(".fa-shopping-cart");
const shoppingCart = document.querySelector(".shopping-cart-popup");

shoppingCartIcon.addEventListener("click", () => {
    if(navLinks.classList.contains("active")){
        navLinks.classList.toggle("active") 
        shoppingCart.classList.toggle("hide")
        hamburger.firstElementChild.classList.toggle("is-active")
    }else{
        shoppingCart.classList.toggle("hide")
    }
    drawShoppingCart();
})

// toggle login page
const loginPage = document.querySelector(".login-page");
const loginUser = document.querySelector(".fa-user");
const exitBoxLogin = document.querySelector(".exit-box-login");

loginUser.addEventListener("click", () => {
  loginPage.classList.toggle("hide");
});
exitBoxLogin.addEventListener("click", () => {
  loginPage.classList.toggle("hide");
});

//toggle create account page

const createAccountBtn = document.querySelector(".create-account-btn");
const createAccountPage = document.querySelector(".create-account-page");
const exitBoxAccount = document.querySelector(".exit-box-account");

createAccountBtn.addEventListener("click", () => {
  loginPage.classList.toggle("hide");
  createAccountPage.classList.toggle("hide");
});

exitBoxAccount.addEventListener("click", () => {
  createAccountPage.classList.toggle("hide");
});

// submit form events

const myFormLogin = document.querySelector(".my-form-login");
const myFormAccount = document.querySelector(".my-form-account");

myFormLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.querySelector("#login-email");
  let password = document.querySelector("#login-password");

  userArray.forEach((userobj) => {
    if (userobj.email == email.value) {
      if (userobj.password == password.value) {
        console.log("hej");

        let indexOfUserLoggedIn = userArray.findIndex((object) => {
          return object.loggedin == true;
        });

        userArray[indexOfUserLoggedIn].loggedin = false;
        userobj.loggedin = true;

        localStorage.setItem("users", JSON.stringify(userArray));
      }
    }
  });

  displayLoggedInUser();

  email.value = "";
  password.value = "";

  loginPage.classList.toggle("hide");
});

myFormAccount.addEventListener("submit", (e) => {
  e.preventDefault();

  // spara ny användare i local storage

  let firstName = document.querySelector("#first-name-account");
  let lastName = document.querySelector("#last-name-account");
  let address = document.querySelector("#address");
  let zipCode = document.querySelector("#zip-code");
  let email = document.querySelector("#e-mail-account");
  let password = document.querySelector("#password-account");
  let confirmPassword = document.querySelector("#confirm-password");
  let phone = document.querySelector("#phone-number");

  if (password.value == confirmPassword.value){
    let userObj = {
      name: `${firstName.value} ${lastName.value}`,
      loggedin: true,
      address: address.value,
      zipCode: zipCode.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      cart: [],
    };
  
    //kod som ändrar guest till false
  
    let indexOfUserLoggedIn = userArray.findIndex((object) => {
      return object.loggedin == true;
    });
  
    userArray[indexOfUserLoggedIn].loggedin = false;
  
    userArray.push(userObj);
    localStorage.setItem("users", JSON.stringify(userArray));
  
    displayLoggedInUser();
  
    firstName.value = "";
    lastName.value = "";
    address.value = "";
    zipCode.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    phone.value = "";
  
    createAccountPage.classList.toggle("hide");

  } else {
    alert("password does not match")
  }


});

// querystrings

let linksInNav = document.querySelector(".links");

let stringifyCategories = (categories) => {
  linksInNav.innerHTML = categories
    .map((category) => {
      return `<a href="product-list.html?category=${category.category}">${category.category}</a>`;
    })
    .join("");
};

getProducts().then((data) => {
  stringifyCategories(data.products);
});

// load guest (from json) in local storage

const getGuest = async () => {
  const response = await fetch("guest-user.json");
  const data = await response.json();
  return data;
};

let userArray = [];

// check if guest exists in local storage

let storedUser = JSON.parse(localStorage.getItem("users"));

if (storedUser) {
  userArray = [...storedUser];
} else {
  // load guest into json

  getGuest().then((data) => {
    userArray.push(data.users[0]);

    localStorage.setItem("users", JSON.stringify(userArray));
  });
}

// check user logged in

let userNameshown = document.querySelector(".user-logged-in")
let cartItemCounter = document.querySelector(".item-counter")
let logOutIcon = document.querySelector(".fa-sign-out")
let userIcon = document.querySelector(".fa-user")

function displayLoggedInUser() {
  let indexOfUserLoggedIn = userArray.findIndex((object) => {
    return object.loggedin == true;
  });

  let userLoggedIn = userArray[indexOfUserLoggedIn].name;

  if (userLoggedIn != "guest") {
    userNameshown.innerText = userLoggedIn;
  }

  // display number of items in cart
    if (userLoggedIn != "guest"){
        userNameshown.innerText = userLoggedIn
        userIcon.classList.add("hide")
        logOutIcon.classList.remove("hide")
    } else {
        userNameshown.innerText = ""
    }

  let itemsInCart = userArray[indexOfUserLoggedIn].cart.length;

  if (itemsInCart > 0) {
    cartItemCounter.classList.remove("hide");
    cartItemCounter.innerText = itemsInCart;
  } else {
    cartItemCounter.classList.add("hide");
  }
}

//Draw shopping cart

let shoppingCartContent = document.querySelector(".shopping-cart-contents");
let priceDetails = document.querySelector(".shopping-cart-details");
let sum = document.querySelector(".sum");

function drawShoppingCart() {
  shoppingCartContent.innerHTML = "";
  priceDetails.innerHTML="";
  let userIndex =0;
  let totalPrice=0;
  userArray.forEach((user, userindex) => {
    if (user.loggedin) {userIndex=userindex}
  });

const userCart = userArray[userIndex].cart;
console.log(userCart);
userCart.forEach((item,index) => {
let section = document.createElement("section");
section.setAttribute('id', index);
section.innerHTML= `<div><img src="${item.image}" alt="product image">
<div>
<h3>${item.name}</h3>
<p>${item.price} SEK</p>
</div>
</div>
<div class="quantity-check"><i class="fa fa-trash-can"></i>
<div class="plus-minus">
</div>
</div>`
    shoppingCartContent.append(section);

let itemPrice = document.createElement("div");
itemPrice.setAttribute('class', 'price-item');
itemPrice.innerHTML=`
<p>1x ${item.name}</p>
<p>${item.price}</p>
`
priceDetails.append(itemPrice)
totalPrice+=parseInt(item.price);
});
console.log(shoppingCartContent)

//ADD TOTAL SUM PART
sum.innerHTML = `
<p>TOTAL</p>
<p>${totalPrice} SEK</p>
`


}

displayLoggedInUser()

function logOut(){

    let areYouSure = confirm("Are you sure you want to log out");

    if (areYouSure == true){

      let indexOfUserLoggedIn = userArray.findIndex(object => {
        return object.loggedin == true
      })

      let indexofGuest = userArray.findIndex(object => {
          return object.name == "guest"
      })

      let userLoggedIn = userArray[indexOfUserLoggedIn]
      let guestUser = userArray[indexofGuest]

      userLoggedIn.loggedin = false
      guestUser.loggedin = true
      console.log(guestUser)
      userIcon.classList.remove("hide")
      logOutIcon.classList.add("hide")

      localStorage.setItem("users", JSON.stringify(userArray))

      displayLoggedInUser()

    }
}

logOutIcon.addEventListener("click", logOut)
