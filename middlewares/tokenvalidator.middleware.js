const jwttoken=require('jsonwebtoken')
const secretKey=require("../secret")
function tokenValidators(token){
   try{
      console.log(jwttoken.verify(token,secretKey))
      return true
    }
   catch(e){
       return false
   }
}

module.exports=tokenValidators