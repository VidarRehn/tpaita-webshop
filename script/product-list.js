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

function drawProducts(jsondata) {
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  if (category) {
    const currentCategory = jsondata.find((cat) => {
      return cat.category == category;
    });
    let productArray = currentCategory.items;
    productArray.forEach((prod) => {
      let article = document.createElement("article");
      article.setAttribute("onclick", "showProduct(this)");
      article.innerHTML = `
            <img src="${prod.image}" alt=""/>
            <div class="price">${prod.price}</div>
            <div class="description">
                <p class="product-name">${prod.name}</p>
                <p class="product-description">${prod.description}</p>
                <button class="add-to-cart-btn"  >Add to cart</button>
            </div>`;
      productListContainer.append(article);
    });
  }
}

getProducts().then((data) => {
  fillingBreadcrumbs(data.products);
  drawProducts(data.products);
});

//TOGGLE PRODUCT DETAILS

const productPopUp = document.querySelector("#product-pop-up");
let productContainer = document.querySelector(".article-container");

function showProduct(x) {
  console.log(x.innerHTML);
  productContainer.innerHTML="";
productContainer.innerHTML=x.innerHTML
  productPopUp.classList.toggle("hide");
}
