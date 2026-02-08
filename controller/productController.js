const fs = require('fs')
const PRODUCT_FILE = "./product.json"
const data = fs.readFileSync(PRODUCT_FILE, "utf-8")
const products = JSON.parse(data)

/*
  GET Method
  Endpoint: /getProducts
  Purpose: Fetch and display all products from products.json file
*/
const getAllProducts = (req, res) => {

    res.status(200).json(products)
}



const getProductsById = (req, res) => {
    console.log(req.params.id)
    const product = products.find(u => u.productId == req.params.id)
    if (!product) {
        return res.status(404).json({ message: "Product not found" })
    }
    res.status(200).json(product)
}

/*
  POST Method
  Endpoint: /addProduct
  Purpose: Add a new product into products.json file
*/
const addNewProduct = (req, res) => {
    const newProduct = {
        productId: products.length + 1,
        productName: req.body.productName,
        description: req.body.description,
        Stock: req.body.Stock
    }
    products.push(newProduct)
    fs.writeFileSync(PRODUCT_FILE, JSON.stringify(products, null, 2))

    res.status(201).json(products)
}

/*
  DELETE Method
  Endpoint: /deleteProduct
  Purpose: Delete a specific product (productId:3)
  productId is received through   req.params
*/

const deleteProduct = (req, res) => {
    let productData = products
    const index = products.find(u => u.productId == req.params.id)
    if (index == -1) {
        return res.status(404).json({ message: "Product not found" })
    }
    productData = productData.filter(p => p.productId != req.params.id)
    fs.writeFileSync(PRODUCT_FILE, JSON.stringify(productData, null, 2))
    res.status(200).json({ message: "Product Deleted Successfully" })

}

/*
  PUT Method
  Endpoint: /updateProduct
  Purpose: Update the description of an existing product (productId:1)
  productId is received through  req.params
*/
const updateProduct = (req, res) => {
    console.log(req.params.id)
    const index = products.findIndex(u => u.productId == req.params.id)


    if (index == -1) {
        return res.status(404).json({ message: "product not found" })
    }

    products[index] = { ...products[index], ...req.body }
    fs.writeFileSync(PRODUCT_FILE, JSON.stringify(products, null, 2))

    res.status(200).json(products[index])
}


module.exports = { getAllProducts, getProductsById, addNewProduct, deleteProduct, updateProduct }
