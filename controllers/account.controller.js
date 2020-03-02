const jwttoken = require("jsonwebtoken");
const User = require("../Model/User");
const bcrypt=require('bcrypt')
const multer=require('multer')
const uuid=require('uuid')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../static/profile");
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + file.originalname);
  }
});
const upload=multer({storage:storage})


function createToken (user)  {
    let payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      id: user._id,
      email: user.email
    };
    var token = jwttoken.sign(payload, process.env.MY_SECRET);
    console.log(process.env.MY_SECRET)
    return token;
  }
module.exports = {
 
  //Register.........................................................................................//
  registerUser: async (req, res) => {
    const { userName, email, password, firstName, lastName } = req.body;
    let user = {};
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = await bcrypt.hash(password,10);
    user.userName = userName;
    let userModel = new User(user);
    userModel
      .save()
      .then(() => {
        let token = createToken(userModel);
        return res.status(200).json(token);
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  },
  //................................Login...............................................................//
  login: async (req, res) => {
    if (req.body.userName && req.body.password) {
      let userName = req.body.userName;
      User.findOne({ userName: userName })
        .then(user => {
          if (!user) {
            return res.json("Username Or Password Error");
          } else {
            bcrypt.compare(req.body.password,user.password).then(
            result=>{
                if(result){
                var token = createToken(user);
                    return res.json(token);
                }
                else{
                    return res.json("Username or Password Error")
                }
            }

          ).catch(
              err=>res.json(err)
          );
              
            
            
          }
        })
        .catch(err => {
          return res.json(err);
        });
    }
  },

  //GetAllUsers...................................................................//
  getAllUsers: (req, res) => {
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.json(err));
  },
  //GetSingleUser.............................................................
  getSingleUser: (req, res) => {
    let id = req.params.id;
    User.findById(id)
      .then(user => res.json(user))
      .catch(err => res.status(404).json("User Not Found"));  
  },
  deleteUser: (req, res) => {
    let id = req.params.id;
    User.findByIdAndDelete(id)
      .then(user => res.json(user))
      .catch(err => res.status(404).json("User Not Found"));
  },
  updateUser: (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(id)
      .then(user => {
        (user.firstName = req.body.firstName
          ? req.body.firstName
          : user.firstName),
          (user.lastName = req.body.lastName
            ? req.body.lastName
            : user.lastNamemaile),
          (user.email = req.body.email ? req.body.email : user.email),
          (user.userName = req.body.userName
            ? req.body.userName
            : user.userName);
        user.save();
        return res.json(user);
      })
      .catch(err => res.status(404).json("User Not Found"));
  },

  addProfile: (upload.single("image"), (req, res) => {
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
  }),
  
  addPhotos:(upload.array('image'),async (req,res)=>{
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

};

