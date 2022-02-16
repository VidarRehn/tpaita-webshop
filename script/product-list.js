
// fixing breadcrumbs

const breadcrumbCategory = document.querySelector("#breadcrumb-category")

const fillingBreadcrumbs = (jsondata) => {
    const params = new URLSearchParams(location.search)
    const category = params.get("category")

    if (category) {
        const currentCategory = jsondata.find(cat => {
            return cat.category == category;
        })
        
        breadcrumbCategory.innerText = currentCategory.category
    }
}

const productListContainer = document.querySelector(".product-list")

async function drawProducts(jsondata){
    const params = new URLSearchParams(location.search)
    const category = params.get("category")

    if (category) {
        const currentCategory = jsondata.find(cat => {
            return cat.category == category;
        })
        let productArray = currentCategory.items
        productArray.forEach(prod => {
            let article = document.createElement("article")
            article.innerHTML = `
            <img src="${prod.image}" alt=""/>
            <div class="price">${prod.price}</div>
            <div class="description">
                <p class="product-name">${prod.name}</p>
                <p class="product-description">${prod.description}</p>
                <button class="add-to-cart-btn">Add to cart</button>
            </div>`
            productListContainer.append(article)
        });
    }
}

getProducts().then(data => {
    fillingBreadcrumbs(data.products)
    drawProducts(data.products).then(addListenerToButtons()
    )
})

// create functionality for add-to-cart buttons

function addListenerToButtons(){
        const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")

        addToCartButtons.forEach(btn => {
        btn.addEventListener("click", (x) => {

            let parent = x.target.parentElement.parentElement
            let productPrice = parent.children[1].innerText
            let productImage = parent.children[0].src
            let productName = parent.children[2].children[0].innerText

            let userObj = {
                image: productImage,
                name: productName,
                price: productPrice
            }

            let indexOfUserLoggedIn = userArray.findIndex(object => {
                return object.loggedin == true
            })

            let userCart = userArray[indexOfUserLoggedIn].cart

            userCart.push(userObj)

            localStorage.setItem("users", JSON.stringify(userArray))

            // find which user is logged in!
        })
    })
}