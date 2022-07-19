const express=require("express")



const router=express.Router()
const {signUp,signIn,updateData,logout,getData}=require("./userController.js")


//routes
router.route("/userpage/signup").post(signUp)
router.route("/userpage/signin").post(signIn)
router.route("/userpage/updatedata/:id").post(updateData)
router.route("/userpage/logout").get(logout)
router.route("/userpage/getdata").get(getData)






module.exports=router