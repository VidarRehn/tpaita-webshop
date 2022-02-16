
// fixing breadcrumbs

const breadcrumbCategory = document.querySelector("#breadcrumb-category")

const fillingBreadcrumbs = (jsondata) => {
    const params = new URLSearchParams(location.search)
    const category = params.get("category")

    if (category) {
        console.log(category);
        const currentCategory = jsondata.find(cat => {
            console.log(cat)
            return cat.category == category;
        })
        
        breadcrumbCategory.innerText = currentCategory.category
    }
}

getProducts().then(data => {
    fillingBreadcrumbs(data.products)
})