require('dotenv').config();
require("./dbconnect").connect();
const express=require('express');
const fileupload=require("express-fileupload");
const cookieParser=require("cookie-parser")
const cloudinary=require("cloudinary").v2

const app=express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//view-engine
app.set("view engine","ejs")
app.set('views','views')

app.use(
    fileupload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    }));
app.use(cookieParser())    


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET

})    

const userRoute=require("./userRoute")
const productRoute=require("./product/productRoute")
//middlewares
app.get("/api",(req,res)=>{
    res.render("home")
})
app.use("/api",userRoute)



app.use("/api/storeapp",(req,res)=>{
    res.send(`<p>hello chandhu</p>`)
})
app.use("/api",productRoute)



module.exports=app