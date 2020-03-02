require('dotenv/config')
const mongoose=require('mongoose')
const DBURI=process.env.CONNECTION_STRING
const options={
    dbName:"TestProject",
  useUnifiedTopology:true,
  useNewUrlParser:true
}
const connecDB = async()=>{
  await mongoose.connect(DBURI,options)
  console.log("Database connected")
}


module.exports=connecDB