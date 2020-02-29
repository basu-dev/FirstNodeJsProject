const mongoose=require('mongoose')


const Post=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    readers:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}]

})

module.exports=Posts=mongoose.model('posts',Post)