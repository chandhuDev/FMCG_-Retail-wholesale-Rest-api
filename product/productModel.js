const  mongoose  = require("mongoose");


const productSchema= new mongoose.Schema({
    productName:{
        type:String,
        required:[true,`productName is required`],
        minlength:3,
        trim:true,
    },
    category:{
        type:String,
        required:[true,`category is required`],
        enum:{
            values:["chocolates","biscuits","chips","softDrinks","FancyItems"],
            message:"You should select from the above products only"
        }
    },
    description:{
        type:String,
        required:[true,"description is required"],
        maxlength:80,
        trim:true,
    },
    quantity:{
        type:Number,
        required:[true,`quantity is required`]
    },
    ratings:{
        type:Number,
        default:0,
    },
    productImages:
        {
            image_id:{
                type:String,
                
            },
            image_url:{
                type:String,
                
            }
        },
    createdAt:{
        type:String,
        default:Date.now,
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                
            },
            comment:{
                type:String,
                
            }
        }
    ]
})

module.exports=mongoose.model("Product",productSchema)