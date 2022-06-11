const mongoose=require('mongoose')
var validator=require('validator')
const bcrypt=require('bcryptjs')
const jwtToken=require("jsonwebtoken")
const uniqueValidator = require('mongoose-unique-validator');
const userSchema=new mongoose.Schema({
  name:{
      type:String,
      required:[true,'please provide the name'],
      minLength:6,
      trim:true,
      
      lowercase:true
       },
  email:{
    type:String,
    required:[true,'please provide the email'],
    unique:true,
    lowercase:true,
   // validate:[customValidator(this.email),"error in email validation"]
     },
  age:{
       type:Number,
       default:20,
     },
  profilePic:{
      id:{
         type:String,
         required:true  
      },
      secure_url:{
          type:String,
          required:true,
      }
  },
  password:{
    type:String,
    required:[true,"password fieldmust be important"],
    
    min:6,
    max:10,
  },
  rating:{
      type:Number,
      default:0,
  },
  borrowNeed:Number,
  lenderAmount:Number,
  role:{
      type:String,
      default:'borrower'
  },
  createdAt:{
      type:Date,
      default: Date.now,
  }  
})
 
// function customValidator(email){
//     console.log(`email is ${email} `)
//      return validator.isEmail(email)
//  }

 userSchema.pre("save",async function(next){
    try{
        if (!this.isModified("password")) {
            return next();
          }
        this.password=await bcrypt.hash(this.password,5)
    
     
    }
     catch(e){
        // console.log(error.message)
         //console.log("error in password hook")
        }
 })


 userSchema.methods.getToken=function(){
      return jwtToken.sign({id:this._id},process.env.SECRET,{
          expiresIn:'1h'
      })
 }


 userSchema.methods.verifyPassword=async function(password){
     //console.log(`${this.password},${password}`)
     
   return await bcrypt.compare(password,this.password)
 }



 userSchema.plugin(uniqueValidator)
 



module.exports=mongoose.model("User",userSchema)



