const loadProduct = async(category) => {
    if (category) {
        const res = await fetch(`https://fakestoreapi.com/products/${category}`)
        const data = await res.json()
        return(data)
    }
    else {
        const res = await fetch(`https://fakestoreapi.com/products`)
        const data = await res.json()
        return(data)
    }
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
// const displayProducts = (products) => {
//     const productsContainer = document.getElementById('products-container')
//     products.forEach(product => {
//         const { title, price, image, rating } = product
//         const { rate, count } = rating
//         const div = document.createElement('div')
//         div.innerHTML = `
//         <div class="card w-85 bg-base-100 shadow-xl">
//         <figure ><img style="height:300px" src="${image}" alt="Shoes" /></figure>
//         <div class="card-body">
//           <h2 class="card-title">${title}</h2>
//           <p>If a dog chews shoes whose shoes does he choose?</p>
//           <div class="card-actions justify-between">
//             <kbd class="btn p-3">${price}$</kbd>
//             <kbd class="btn p-3">${rate}</kbd>
//             <button class="btn btn-primary">Buy Now</button>
//           </div>
//         </div>
//       </div>
//         `
//         productsContainer.appendChild(div)
//     })
// }
// event handler in search field
document.getElementById('search-field').addEventListener('keypress', async(event) => {
    const keyPress = event.key
    if (keyPress === 'Enter') {
        const searchField = document.getElementById('search-field')
        const searchText = searchField.value
        const loadAllProducts = await loadProduct()
        const foundProduct = loadAllProducts.filter(product => product.category.includes(searchText))
        const productsContainer = document.getElementById('products-container')

        // not found msg showing start
        const notFound = document.getElementById('not-found')
        if (foundProduct.length === 0) {
            notFound.innerHTML = `
            <h2 class="text-4xl">No Products Found</h2>
            `
        }
        else {
            notFound.innerText = ''
        }
        // not found msg showing part end
        console.log(foundProduct)
        productsContainer.textContent = ``
        foundProduct.forEach(product => {
        const { title, price, image, rating } = product
        const { rate, count } = rating
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card w-85 bg-base-100 shadow-xl">
        <figure ><img style="height:250px" src="${image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${title.length > 20?title.slice(0,20) + '...':title}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-between">
            <kbd class="btn p-3">${price}$</kbd>
            <kbd class="btn p-3">${rate}</kbd>
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
        `
        productsContainer.appendChild(div)
        searchField.value = ``
    })
        
    }
})


displayMenu()

// callProducts()