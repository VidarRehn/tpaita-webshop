// toggle hamburger

const navLinks = document.querySelector(".navlinks");
const hamburger = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
    if(shoppingCart.classList.contains("hide")){
        navLinks.classList.toggle("active")
    }else{
        navLinks.classList.toggle("active")
        shoppingCart.classList.add("hide") 
    }
    hamburger.firstElementChild.classList.toggle("is-active")
})


// toggle shopping cart
const shoppingCartIcon = document.querySelector(".fa-shopping-cart");
const shoppingCart = document.querySelector(".shopping-cart-popup");

shoppingCartIcon.addEventListener("click", () => {
    if(navLinks.classList.contains("active")){
        navLinks.classList.remove("active") 
        shoppingCart.classList.toggle("hide")
        hamburger.firstElementChild.classList.remove("is-active")
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
  loginPage.classList.add("hide");
});

//toggle create account page

const createAccountBtn = document.querySelector(".create-account-btn");
const createAccountPage = document.querySelector(".create-account-page");
const exitBoxAccount = document.querySelector(".exit-box-account");

createAccountBtn.addEventListener("click", () => {
  loginPage.classList.add("hide");
  createAccountPage.classList.remove("hide");
});

exitBoxAccount.addEventListener("click", () => {
  createAccountPage.classList.add("hide");
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
        
        let indexOfUserLoggedIn = userArray.findIndex((object) => {
          return object.loggedin == true;
        });

        userArray[indexOfUserLoggedIn].loggedin = false;
        userobj.loggedin = true;

        localStorage.setItem("users", JSON.stringify(userArray));

        displayLoggedInUser();
        loginPage.classList.toggle("hide");

        email.value = "";
        password.value = "";
      }
    }
  });

  if(email.value !== ""){
    alert("not a user")
    email.value = "";
    password.value = "";
  } else {
    email.value = "";
    password.value = "";
  }
  shoppingCart.classList.add("hide")
  if(window.location.href.indexOf("order-page.html") != -1){
    window.location.href = "index.html"
  }
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
  shoppingCart.classList.add("hide")
  if(window.location.href.indexOf("order-page.html") != -1){
    window.location.href = "index.html"
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


    if (userLoggedIn != "guest"){
        userNameshown.innerText = userLoggedIn
        userIcon.classList.add("hide")
        logOutIcon.classList.remove("hide")
    } else {
        userNameshown.innerText = ""
    }

      // display number of items in cart

  let itemsInCart = userArray[indexOfUserLoggedIn].cart;
  let counter = 0

  itemsInCart.forEach(item => {
    counter += item.quantity
  })

  if (counter > 0) {
    cartItemCounter.classList.remove("hide");
    cartItemCounter.innerText = counter;
  } else {
    cartItemCounter.classList.add("hide");
  }
}

//Draw shopping cart

let shoppingCartContent = document.querySelector(".shopping-cart-contents");
let priceDetails = document.querySelector(".shopping-cart-details");
let sum = document.querySelector(".sum");
const cartIsNotEmpty = document.querySelector(".cart-not-empty");
const cartIsEmpty = document.querySelector(".cart-is-empty");

function drawShoppingCart() {
  cartIsEmpty.innerHTML= "";
  shoppingCartContent.innerHTML = "";
  priceDetails.innerHTML="";
  let userIndex =0;
  let totalPrice=0;

  //LOOK FOR CORRECT USER CART
  userArray.forEach((user, userindex) => {
    if (user.loggedin) {userIndex=userindex}
  });

const userCart = userArray[userIndex].cart;


//IF EMPTY = TOGGLE DISPLAY SHOPPING CART
if(userCart.length===0){
  cartIsNotEmpty.classList.toggle("hide");
  cartIsEmpty.innerHTML = `
  <h1>YOUR CART IS EMPTY MAN</h1>
  <img src="./images/empty-shopping-cart.jpg" alt="empty shopping cart">
  `;
}else{
//IF NOT EMPTY :
// DRAW SHOPPINGCART
userCart.forEach((item,index) => {
let section = document.createElement("section");
section.setAttribute('id', index);
section.innerHTML= `<div><img src="${item.image}" alt="product image">
<div>
<h3>${item.name}</h3>
<p>${item.price},00 SEK</p>
</div>
</div>
<div class="quantity-check"><i onClick="deleteItem(this)" class="fa fa-trash"></i>
<div class="plus-minus">
<div onClick="decreaseQuantity(this)">-</div>
<div class="quantity-counter">${item.quantity}</div>
<div onClick="increaseQuantity(this)">+</div>
</div>
</div>`
    shoppingCartContent.append(section);

let itemPrice = document.createElement("div");
itemPrice.setAttribute('class', 'price-item');
itemPrice.innerHTML=`
<p>${item.quantity}x ${item.name}</p>
<p>${(item.price)*(item.quantity)},00</p>
`
priceDetails.append(itemPrice)
totalPrice+=parseInt((item.price)*(item.quantity));
});}

//ADD TOTAL SUM PART
sum.innerHTML = `
<p>TOTAL</p>
<p>${totalPrice},00 SEK</p>
`

}

//hämta id från parent section och kicka det från cart arrayen  (stackade items kommer sen)

function deleteItem(x) {
  let userIndex =0;
  userArray.forEach((user, userindex) => {
    if (user.loggedin) {userIndex=userindex}
  });
  let deletedItem = userArray[userIndex].cart.splice(x.parentElement.parentElement.id, 1);
  localStorage.setItem("users", JSON.stringify(userArray));
  displayLoggedInUser() 
  drawShoppingCart()
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
      userIcon.classList.remove("hide")
      logOutIcon.classList.add("hide")
      shoppingCart.classList.add("hide")
      if(window.location.href.indexOf("order-page.html") != -1){
        window.location.href = "index.html"
      }

      localStorage.setItem("users", JSON.stringify(userArray))

      displayLoggedInUser()
    }
}

logOutIcon.addEventListener("click", logOut)

function decreaseQuantity(x){
  let name = x.parentElement.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.innerText

  let indexOfUserLoggedIn = userArray.findIndex((object) => {
    return object.loggedin == true;
  });

  let userCart = userArray[indexOfUserLoggedIn].cart;

  userCart.forEach(item => {
    if (item.name == name){
      if (item.quantity > 1){
          item.quantity--
      }
    } 
  })

  localStorage.setItem("users", JSON.stringify(userArray));

  displayLoggedInUser();
  drawShoppingCart()
}

function increaseQuantity(x){
  let name = x.parentElement.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.innerText

  let indexOfUserLoggedIn = userArray.findIndex((object) => {
    return object.loggedin == true;
  });

  let userCart = userArray[indexOfUserLoggedIn].cart;

  userCart.forEach(item => {
    if (item.name == name){
      item.quantity++
    } 
  })

  localStorage.setItem("users", JSON.stringify(userArray));

  displayLoggedInUser();
  drawShoppingCart()
}



// receipt

function validation() {
  const inputfield1 = document.querySelectorAll(".input1").required;
  const inputfield2 = document.querySelectorAll(".input2").required;
  document.getElementById("demo").innerHTML = inputfield1 + inputfield2;
}

const form = document.forms[2]
const callButton = document.querySelector('.pay-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.close-button');
const receipt = document.querySelector(".product-receipt")
const receiptSum = document.querySelector(".receipt-sum")
const buyerInfo = document.querySelector(".buyer-info")

form.addEventListener('submit', (e) => { 
  e.preventDefault();
  const popupToggle = () => {
    popup.classList.toggle('popup-opened');
  }
  popupToggle()
  fillReceipt()

})

closeButton.addEventListener('click', (e) => { 
  window.location.href = "index.html"
  clearCart()
})

const firstNameInput = document.querySelector("#firstname")
const lastNameInput = document.querySelector("#lastname")
const emailInput = document.querySelector("#email")
const telephoneInput = document.querySelector("#telephone")
const addressInput = document.querySelector("#address-input")
const zipCodeInput = document.querySelector("#zip")
const otherCommentsInput = document.querySelector("#other-comments")

function prePopulateFields(){

  let indexOfUserLoggedIn = userArray.findIndex((object) => {
    return object.loggedin == true;
  });

  let currentUser = userArray[indexOfUserLoggedIn]

  if (currentUser.name != "guest"){
    let nameArray = currentUser.name.split(" ")
    firstNameInput.value = nameArray[0]
    lastNameInput.value = nameArray[1]
    emailInput.value = currentUser.email
    telephoneInput.value = currentUser.phone
    addressInput.value = currentUser.address
    zipCodeInput.value = currentUser.zipCode
  }
}

prePopulateFields()


function fillReceipt(){

  let totalPrice=0;
  let indexOfUserLoggedIn = userArray.findIndex((object) => {
    return object.loggedin == true;
  });

  let buyer = userArray[indexOfUserLoggedIn]
  let userCart = userArray[indexOfUserLoggedIn].cart

  let buyerInfoContainer = document.createElement("div")
  if (buyer.name != "guest"){
    buyerInfoContainer.innerHTML = `
    <p>${buyer.name}</p>
    <p>${buyer.address}, ${buyer.zipCode}</p>
    <p>${buyer.email}</p>
    <br>
    <span>${otherCommentsInput.value}</span>
    <br>
    <br>
    `
  } else {
    buyerInfoContainer.innerHTML = `
    <p>${firstNameInput.value} ${lastNameInput.value}</p>
    <p>${addressInput.value}, ${zipCodeInput.value}</p>
    <p>${emailInput.value}</p>
    <br>
    <span>${otherCommentsInput.value}</span>
    <br>
    <br>
    `
  }


  buyerInfo.append(buyerInfoContainer)

  userCart.forEach(item => {
    let itemPrice = document.createElement("div");
    itemPrice.setAttribute('class', 'price-item');
    itemPrice.innerHTML=`
    <p>${item.quantity}x ${item.name}</p>
    <p>${(item.price)*(item.quantity)},00</p>
    `
    receipt.append(itemPrice)
    totalPrice+=parseInt((item.price)*(item.quantity));
  })

  //ADD TOTAL SUM PART
  receiptSum.innerHTML = `
  <p>TOTAL</p>
  <p>${totalPrice},00 SEK</p>
  <br>
  `
}

function clearCart(){

  let indexOfUserLoggedIn = userArray.findIndex((object) => {
    return object.loggedin == true;
  });

  let userCart = userArray[indexOfUserLoggedIn].cart

  userCart.length = 0

  localStorage.setItem("users", JSON.stringify(userArray));

  displayLoggedInUser();
  drawShoppingCart()
}

// print receipt

const printButton = document.querySelector("#print-btn")
console.log(printButton)

printButton.addEventListener("click", ()=>{
  window.print()
})