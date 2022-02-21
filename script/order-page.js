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