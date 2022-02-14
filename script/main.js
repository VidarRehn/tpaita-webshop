
const navLinks = document.querySelector(".navlinks")
const hamburger = document.querySelector(".navbar")

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("hide")
})