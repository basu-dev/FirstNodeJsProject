const jwttoken=require('jsonwebtoken')
const tokenValidators=(req,res,next)=>{
   try{
      let tokenparams=jwttoken.verify(req.headers.authorization,process.env.MY_SECRET)
      next()
   //    if(tokenparams.userName==='basu'){
   //       next()
   //    }
   //   else{
   //      res.json("Unauthorized as basu")
   //   }
    }
   catch(e){
       return res.json("Unauthorized")
   }
}

module.exports=tokenValidators