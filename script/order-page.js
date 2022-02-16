function validation() {
  const inputfield1 = document.querySelectorAll(".input1").required;
  const inputfield2 = document.querySelectorAll(".input2").required;
  const form = document.querySelectorAll(".order-form");
  document.getElementById("demo").innerHTML = inputfield1 + inputfield2;
  

  
  const paybutton = document.querySelector(".pay-button")
  paybutton.addEventListener ("click", () => {
  validation ()
  });
}

form.addEventListener('submit', (e) => { 
  e.preventDefault();