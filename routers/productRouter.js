const express = require('express')
const productRouter = express.Router()
const {getAllProducts,getProductsById,addNewProduct,deleteProduct,updateProduct}=require('../controller/productController')
productRouter.get('/getProducts',getAllProducts)
productRouter.get('/getProducts/:id',getProductsById)
productRouter.post('/addProduct',addNewProduct)
productRouter.delete('/deleteProduct/:id', deleteProduct)
productRouter.put('/updateProduct/:id', updateProduct)


module.exports={productRouter}