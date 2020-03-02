const mongoose=require('mongoose')

const userProfile=mongoose.Schema({

    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    bio:{
        type:String,
        require:true,
    },
    profileImage:{
        type:String
    },
    dob:{
        type:String,
        require:false
    },
    address:{
        type:String,
        require:false
    },
    photos:[{
        _id:{type:String,require:true},
        url:{type:String,require:true}

    }],
    contacts:{
        email:{
            type:String
        },
        tel:{
            type:Number,
            require:false,
            minLength:1
        },
        mobileNo:{
            type:Number,
            require:false,
            minLength:1
        }
    }

})

module.exports=UserProfile=mongoose.model("userProfile",userProfile)