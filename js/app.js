const loadProduct = async() => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    return(data)
}

const displayMenu = async () => {
    const productsList = await loadProduct()
    const menuItems = document.getElementById('menu-item')
    // category array
    const productCategory = []
    for (let product of productsList) {
        // destructure the product object
        const { category } = product
        
        if (productCategory.indexOf(category) === -1) {
            console.log()
            productCategory.push(category)
            const li = document.createElement('li')
            li.innerHTML = `
            <a>${category}</a>
            `
            menuItems.appendChild(li)
        }
    }
    
}
// call product array in the console
const callProducts = async () => {
    const productsList = await loadProduct()
    displayProducts(productsList)
}

// display product in the feed
const displayProducts = (products) => {
    const productsContainer = document.getElementById('products-container')
    products.forEach(product => {
        const { title, price, image, rating } = product
        const { rate, count } = rating
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card w-85 bg-base-100 shadow-xl">
        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
        `
        productsContainer.appendChild(div)
    })
}

displayMenu()

callProducts()