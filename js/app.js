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

displayMenu()