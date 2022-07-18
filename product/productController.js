
const productModel=require("../product/productModel")
const cloudinary=require("cloudinary").v2
const FindProducts=require("./middlewares")

exports.createProduct=async (req,res,next)=>{
    try{
    const {productName,category,description,quantity,ratings,comment}=req.body
    
    let imagesList={}

    if(req.files){
           const resultImage=await cloudinary.uploader.upload(
                req.files.productImages.tempFilePath,
                {
                    folder:"/storeapp/productFolder"
                }
            )

            imagesList.image_id=resultImage.public_id
            imagesList.image_url=resultImage.secure_url

            
            
        }
        //console.log(`${productName},${category},${description},${quantity}`)
        const productResult=await productModel.create({
            productName,
            category,
            description,
            quantity,
            productImages:imagesList
            })
    
            res.status(200).json({
                message:"successfully updated",
                productResult
            })
    
           // console.log("succesfully created")
    }
   // console.log(`${productName},${category},${description},${quantity},${imagesList}`)
       catch(e){
          // console.log("error in uploading data")
           //console.log(e.message)
           next()
       }
    }




exports.getAllProductsDynamic=async (req,res,next)=>{
   
   try{ 
       const {sort,limit,skip,fields}=req.query
   //search&&Filters
   //console.log(req.query)
   const products=new FindProducts(productModel.find(),req.query).Search().Filters()
  // const logDE=JSON.stringify(products.Base)
  // console.log(`${products.Base}`)
   const productList=await products.Base
   const length=productList.length
   //sort
   if(sort){
       let sortList=fields.split(',').join(' ')
   products=await productList.sort(sortList)
   }
   //limit,skip
   if(limit){
       
       let page=Number(req.query.page)||1
       const limit = Number(req.query.limit) || 4;
       let resultsPerPage=(page-1)*limit
       productList=productList.limit(limit).skip(resultsPerPage)
   }

   res.status(200).json({
       message:"sucessfully send",
       productList,
       productsLength:length
       
       
   })
  
   
   }
   catch(e){
    //console.log("error in retreiving data of dynamic-content")
   // console.log(e)
    next()
   }
}

