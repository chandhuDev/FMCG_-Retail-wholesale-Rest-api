const express=require("express")



const router=express.Router()
const {signup,signin,updatedata,logout,getdata}=require("./userController.js")


//routes
router.route("/userpage/signup").post(signup)
router.route("/userpage/signin").post(signin)
router.route("/userpage/updatedata/:id").post(updatedata)
router.route("/userpage/logout").get(logout)
router.route("/userpage/getdata").get(getdata)






module.exports=router