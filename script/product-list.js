// fixing breadcrumbs

const breadcrumbCategory = document.querySelector("#breadcrumb-category");

const fillingBreadcrumbs = (jsondata) => {
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  if (category) {
    const currentCategory = jsondata.find((cat) => {
      return cat.category == category;
    });

    breadcrumbCategory.innerText = currentCategory.category;
  }
};

const productListContainer = document.querySelector(".product-list");

async function drawProducts(jsondata) {
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  if (category) {
    const currentCategory = jsondata.find((cat) => {
      return cat.category == category;
    });
    let productArray = currentCategory.items;
    productArray.forEach((prod) => {
      let article = document.createElement("article");
      // article.setAttribute('onclick','showProduct(this)')
      article.innerHTML = `
            <img src="${prod.image}" alt="" onClick="showProduct(this)" />
            <div class="price">${prod.price}</div>
            <div class="description">
                <p class="product-name">${prod.name}</p>
                <p class="product-description">${prod.description}</p>
                <button class="add-to-cart-btn" onClick="addProductToCart(this)" >Add to cart</button>
            </div>`;
      productListContainer.append(article);
    });
  }
}

getProducts().then((data) => {
  fillingBreadcrumbs(data.products);
  drawProducts(data.products);
}).then(searchFilter);

// create functionality for add-to-cart buttons

function addProductToCart(x) {
  let parent = x.parentElement.parentElement;
  let productPrice = parent.children[1].innerText;
  let productImage = parent.children[0].src;
  let productName = parent.children[2].children[0].innerText;

  let indexOfUserLoggedIn = userArray.findIndex((object) => {
    return object.loggedin == true;
  });

  let userCart = userArray[indexOfUserLoggedIn].cart;

  let counter = 0;

  function doesItemExist(){
    userCart.forEach(item => {
      if (item.name == productName){
        counter++;
      }
    })
    if (counter > 0){
      userCart.forEach(item => {
        if (item.name == productName){
          item.quantity++
        }
      })
    } else {
      
      let userObj = {
        image: productImage,
        name: productName,
        price: productPrice,
        quantity: 1
      };

      userCart.push(userObj);
    }
  }

  doesItemExist()

  localStorage.setItem("users", JSON.stringify(userArray));

  displayLoggedInUser();
  shoppingCart.classList.add("hide")
}

//TOGGLE PRODUCT DETAILS

const productPopUp = document.querySelector("#product-pop-up");
let productContainer = document.querySelector(".article-container");
let title = document.querySelector(".product-name-title");
function showProduct(x) {
    window.scrollTo(0, 0);
  productContainer.innerHTML = "";
  if (productPopUp.classList.contains("hide")) {
    productContainer.innerHTML = x.parentElement.innerHTML;
    title.innerText = x.parentElement.lastChild.firstElementChild.innerText;
  }
  productPopUp.classList.toggle("hide");
}

const searchInput = document.querySelector("#filter");

function searchFilter () {
  let itemsOnPage = document.querySelectorAll("article");

  searchInput.addEventListener("input", () => {
    itemsOnPage.forEach(article => {
      article.classList.remove("hide")
      let description = article.childNodes[5].childNodes[3].innerText
      let name = article.childNodes[5].childNodes[1].innerText

      if(description.includes(searchInput.value) || name.includes(searchInput.value)){
      }else {
        article.classList.add("hide")
      } 
    })
  })
}