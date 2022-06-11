const express=require("express")
const cloudinary=require("cloudinary").v2
const User=require("./userSchema")
const {cookieToken}=require("./cookieSent")

exports.signUp=async (req,res,next)=>{
    try{
        var {name,email,password}=req.body;
       
     var imageUpload=req.files.imageUpload;
     if(!name || !email || !password){
         return next(new Error("should give proper details"))
     }
    // console.log(`${name},${email},${password}`)
     const resultImageUpload= await cloudinary.uploader.upload(imageUpload.tempFilePath,{
         folder:"/storeapp/UserProfilePictures",
     })
    
     //console.log(new Date(Date.now()))
     const user= await User.create({
        name,
        email,
        password,
        profilePic:{
            id:resultImageUpload.public_id,
            secure_url:resultImageUpload.secure_url
        },
       
    })
    //console.log("successfully signed up")
     cookieToken(user,res)
    }
    catch(e){
        //console.log("unsuccessfull in sign up process")
      //  console.log(e.message)
        //console.log("eror in the signUp")
        next()
    }
     
}


exports.signIn=async (req,res,next)=>{
    try{
    var {email,password}=req.body
    if(!email||!password){
        return next(new Error("provide both details"))
    }

    const user=await User.findOne({email})
    if(!user){
        return next(new Error("you should first do signup before login"))
    }
    const isPasswordVerified=user.verifyPassword(password)
    if(!isPasswordVerified){
        return next(new Error("password is wrong"))
    }
    cookieToken(user,res)
     }
     catch(e){
         console.log(e.message)
         console.log("eror in the signin")
     }

}

exports.updateData=async (req,res,next)=>{
     try{
         const newData={
            name:req.body.name,
            email:req.body.email,
        }
        if(req.files){
      const user=await User.findById(req.params.id)

      const imageId=user.profilePic.id
      const resp = await cloudinary.v2.uploader.destroy(imageId);
      const result = await cloudinary.v2.uploader.upload(
        req.files.photo.tempFilePath,
        {
          folder: "/storeapp/UserProfilePictures",
          
        })
        newData.profilePic = {
            id: result.public_id,
            secure_url: result.secure_url,
          }


        const updatedUser=await User.findByIdAndUpdate(req.params.id,newData,{
            new:true,
            runValidators:true,
            useFindAndModify: false,
        })
    }



        res.status(200).send({
            success:true,
            message:"successfully updated data in database"
        })
     }
     catch(e){
        console.log(e.message)
        console.log("eror in the updatingData")
     }
}

exports.logout=(req,res,next)=>{
  res.cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly:true
  })

  res.status(200).send({
      success:true,
      message:"updated successfully"
  })
}

exports.getData=async (req,res,next)=>{
    try{
        const user=await User.find().find({age:"20"})
        if(!user){
            return next(new Error("No user found"))
        }

        res.status(200).json({
            message:"found user data",
            user,
        })

    }
    catch(e){
        console.log(e.message)
        console.log("eror in the signUp")
    }
   

}