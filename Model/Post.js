const mongoose=require('mongoose')
const User=require("./User")
const Post=mongoose.Schema({
    titie:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    user:{
        type:User,
        require:true
    }
})

module.exports=Posts=mongoose.model('posts',Post)