const mongoose =require('mongoose')

const user=new mongoose.Schema({
    firstName:{
        type:String,
        required:false,
    
    },
    lastName:{
        type:String,
        required:false
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false
    },
    createdDate:{
        type:Date,
        default:Date.now
    }

})

module.exports=User=mongoose.model('user',user)