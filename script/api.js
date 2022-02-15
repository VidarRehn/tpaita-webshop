// get products from JSON

async function getProducts(){
    const response = await fetch("./products.json")
    const data = await response.json()
    return data;
}