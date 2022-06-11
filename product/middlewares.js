const productModel=require("../product/productModel")

class FindProducts{
  constructor(Base,BigQuery){
      this.Base=Base
      this.BigQuery=BigQuery
  }
  Search(){
      let searchWord=this.BigQuery.search?{
          category:{
              $regex:this.BigQuery.search,
              $options:"i"
          }
      }:{}
      this.Base=this.Base.find({...searchWord})
   
       return this
  }
  Filters(){
      let localQuery=this.BigQuery
      const regexExp=/\b(gte|lte|gt|lt)\b/g
     // delete localQuery['search']
     delete localQuery['sort']
      delete localQuery['limit']
     delete localQuery['skip']
     let JsonQuery=JSON.stringify(localQuery)
     console.log(typeof JsonQuery)
     JsonQuery=JsonQuery.replace(regexExp,(m)=>`$${m}`)
     localQuery=JSON.parse(JsonQuery)
     this.Base=this.Base.find(localQuery)
     return this

  }


}

module.exports=FindProducts