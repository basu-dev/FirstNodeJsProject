const express=require('express')
const app=express()
const exphbs=require('express-handlebars')
const logincontrol=require("./controllers/account.controller").login


//db................................................................................................//
const connectDB=require('./db')
connectDB()
//parseJson..............................................................................................//
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//setHandlebars..........................................................................................//
app.set('view engine', "handlebars");
app.use(express.static(__dirname+"/static"));
//Bootstrap..................................................................................................//
app.use('/bootstrap',express.static(__dirname+"/node_modules/bootstrap/dist/css/"))
app.engine( 'handlebars', exphbs( {
   extname: 'handlebars',
 defaultLayout:"main",
  
}));

//Routes......................................................................................................//
app.use("/api",require("./middlewares/tokenvalidator.middleware"))
app.use("/account",require("./middlewares/tokenvalidator.middleware"))
app.use("/api",require("./controllers/member.controller")),
app.use("/account",require("./routes/account.route"))
app.use("/login",logincontrol)


const PORT=process.env.PORT || 8000
app.listen(PORT,()=>console.log(`Server Started At Port ${PORT}`))