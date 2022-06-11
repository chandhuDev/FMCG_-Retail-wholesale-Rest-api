const mongoose=require("mongoose")

exports.connect=async ()=>{
   try{
       await mongoose.connect(process.env.DB_URL,{
           useNewUrlParser:true,
           useUnifiedTopology: true,
       });
      // console.log("MongoDB connected!!");
    
   }
   catch(e){
       //console.log("error in connection");
       //console.log(e.message)
   }
} 