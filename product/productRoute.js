const express=require("express")
const router=express.Router()

const {createProduct,getAllProductStatic,getAllProductsDynamic}=require("./productController")

router.route("/products/createProduct").post(createProduct)

router.route("/products/getAllProductsDynamic").get(getAllProductsDynamic)

module.exports=router