const express=require('express')
const router=express.Router()
const members=require("../Datapool/members..datapool")
const uuid=require('uuid')
const jwttoken=require('jsonwebtoken')
const secretKey=require('../secret')
const tokenValidate=require('../middlewares/tokenvalidator.middleware')

router.get("/members",(req,res)=>{

    
    res.render('index',({members:members}))


    
})
router.get("/members/:id",(req,res)=>{

   const id= parseInt(req.params.id)
   if(members.some(member=>member.id===id)){
   
   return res.json(members.filter(m=>m.id===id))
   }
   else{
       return res.status(404).json("Member not found")
   }

})
router.post("/members",(req,res)=>{

    var newMember={
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,

    }
    members.push(newMember)
    res.json(members)
})
router.put("/members/:id",(req,res)=>{

    const id= parseInt(req.params.id)
    if(members.some(member=>member.id===id)){
    members.forEach(member=>{
        if(member.id===id){
            member.name=req.body.name?req.body.name:member.name,
            member.email=req.body.email?req.body.email:member.email
        }
        return res.json(member)
    })

    }
    else{
        return res.status(404).json("Member not found")
    }
 
 })
 router.delete("/members/:id",(req,res)=>{

    const id= parseInt(req.params.id)
    if(members.some(member=>member.id===id)){
    
    return res.json(members.filter(m=>m.id!==id))
    }
    else{
        return res.status(404).json("Member not found")
    }
 
 })

 router.post("/login",(req,res)=>{
     if(req.body.email && req.body.password){
        members.forEach(member=>{
            if(member.email===req.body.email || req.body.name){
                var token=jwttoken.sign({"name":req.body.email},secretKey)
                res.json(token)
            }
        })
     }
     else{
         res.status(400).json("Enter Email and Password")
     }
 })

 router.get("/test",(req,res)=>{

    return res.render("index")
    
 })



module.exports=router