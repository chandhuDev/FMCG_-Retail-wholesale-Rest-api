const express=require("express")



const router=express.Router()
const {signUp,signIn,updateData,logout,getData}=require("./userController.js")


//routes
router.route("/userPage/signUp").post(signUp)
router.route("/userPage/signIn").post(signIn)
router.route("/userPage/updateData/:id").post(updateData)
router.route("/userPage/logout").get(logout)
router.route("/userPage/getData").get(getData)






module.exports=router