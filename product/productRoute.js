const express=require("express")
const router=express.Router()

const {createProduct,getAllProducts,getAllProductsDynamic}=require("./productController")

router.route("/products/createProduct").post(createProduct)

router.route("/products/getProductsDynamic").get(getAllProductsDynamic)

module.exports=router