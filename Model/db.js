const mongoose=require('mongoose')
const DBURI="mongodb+srv://basudev:dbUser@cluster0-htenl.mongodb.net/test?retryWrites=true&w=majority"
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