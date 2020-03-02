"use strict";
const express = require("express");
const router = express.Router();
const members = require("../Datapool/members..datapool");
const uuid = require("uuid");
const jwttoken = require("jsonwebtoken");
const tokenValidate = require("../middlewares/tokenvalidator.middleware");
const UserProfile = require("../Model/userProfile");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/profile");
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + file.originalname);
  }
});

const upload = multer({ storage: storage });

require("dotenv/config");

router.get("/members", (req, res) => {
  res.render("index", { members: members });
});
router.get("/members/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (members.some(member => member.id === id)) {
    return res.json(members.filter(m => m.id === id));
  } else {
    return res.status(404).json("Member not found");
  }
});
router.post("/members", (req, res) => {
  var newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email
  };
  members.push(newMember);
  res.json(members);
});
router.put("/members/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (members.some(member => member.id === id)) {
    members.forEach(member => {
      if (member.id === id) {
        (member.name = req.body.name ? req.body.name : member.name),
          (member.email = req.body.email ? req.body.email : member.email);
      }
      return res.json(member);
    });
  } else {
    return res.status(404).json("Member not found");
  }
});
router.delete("/members/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (members.some(member => member.id === id)) {
    return res.json(members.filter(m => m.id !== id));
  } else {
    return res.status(404).json("Member not found");
  }
});

router.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    members.forEach(member => {
      if (member.email === req.body.email || req.body.name) {
        var token = jwttoken.sign(
          { name: req.body.email },
          process.env.MY_SECRET
        );
        res.json(token);
      }
    });
  } else {
    res.status(400).json("Enter Email and Password");
  }
});
router.get("/test", (req, res) => {
  return res.render("index");
});
//check if userId is logged in user by decoding the jwt token userId

router.post("/uploadProfile", upload.single("image"), (req, res) => {
  if (!req.body.userId && req.body.bio) {
    return res.status(400).json("Invalid Attmempt");
  }
  var userProfile = new UserProfile();
  userProfile.userId = req.body.userId;
  if (req.body.tel) userProfile.id = req.body.userId;
  if (req.file) userProfile.profileImage = req.file.path;
  if (req.body.bio) userProfile.bio = req.body.bio;
  if (req.body.dob) userProfile.dob = req.body.dob;
  if (req.body.address) userProfile.address = req.body.address;
  if (req.body.email) userProfile.contacts.email = req.body.email;
  if (req.body.tel) userProfile.contacts.tel = req.body.tel;
  if (req.body.mobileNo) userProfile.contacts.mobileNo = req.body.mobileNo;
  userProfile.save();
  return res.json(userProfile);
});

router.post("/uploadImages",upload.array('image'),async (req,res)=>{
    if(req.body.userId && req.files){
        
        let photos=await UserProfile.findOne({userId:req.body.userId})
       const photosa=[];
        req.files.forEach(file => {
           let photo={
                _id:uuid.v4(),
                url:file.filename
            }
            photosa.push(photo)
            
        });
        photos.photos=photosa
       photos.save()
        
        
       
      
        
        return res.json(photos)
    }
    else{
        return res.json("Invalid data.")
    }
    
})

module.exports = router;
