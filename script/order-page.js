function validation() {
  const inputfield1 = document.querySelectorAll(".input1").required;
  const inputfield2 = document.querySelectorAll(".input2").required;
  document.getElementById("demo").innerHTML = inputfield1 + inputfield2;
}

const form = document.forms[2]
form.addEventListener('submit', (e) => { 
  e.preventDefault();
  console.log("byter sida")
  window.location.href = "/tpaita-webshop/receipt.html"
}
)

const firstNameInput = document.querySelector("#firstname")
const lastNameInput = document.querySelector("#lastname")
const emailInput = document.querySelector("#email")
const telephoneInput = document.querySelector("#telephone")
const addressInput = document.querySelector("#address-input")
const zipCodeInput = document.querySelector("#zip")

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