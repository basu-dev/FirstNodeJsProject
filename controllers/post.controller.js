const Post=require("../Model/Post")
const User=require("../Model/User")

module.exports={

    addPost:(req,res)=>{
        if(req.body.title && req.body.body && req.body.user){
        const {title,body,user}=req.body
            let post={}
                post.title=title
                post.body=body
                
            
            postModel=new Post(post)
            postModel.save().then(
                (data)=>{
                    
                    console.log(data);
                    return res.json(data)
                }
            ).catch(
                (err)=>res.json(err)
            )
        }
        else{
            return res.json("Invalid Data")
        }
    },
    allPosts:async (req,res)=>{
        Post.find().populate("user",['userName','password']).populate("readers",['userName']).exec(
            (err,posts)=>{
                if(err){
                   return res.json(err)
                }
                else{
                   return res.json(posts)
                }
            }
        )

    },
    singlePost: (req,res)=>{
        Post.findById(req.params.id).populate('user').exec(
            (err,post)=>{
                if(err) return res.json(err)
                else return res.json(post)
            }
        )
    },
    addReadersToPost: (req,res)=>{

        let members= req.body.members
        Post.findById(req.body.post).populate("readers").exec(
            (err,post)=>{
                if(err) return res.json(err)
                else{
                    post.readers=members
                    post.save()
                    return res.json(post)
                }
            }
        )
    
    }
    

}
