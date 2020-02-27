const express=require('express')
const app=express()
const exphbs=require('express-handlebars')

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', "handlebars");
app.use(express.static(__dirname+"/static"));

app.use('/bootstrap',express.static(__dirname+"/node_modules/bootstrap/dist/css/"))
app.engine( 'handlebars', exphbs( {
  // extname: 'handlebars',
 defaultLayout:"main",
  // layoutsDir: __dirname + '/views/',
  // partialsDir: __dirname + '/views/partials/'
}));

// app.use(authentication)
app.use("/api",require("./controllers/member.controller"))


const PORT=8000
app.listen(PORT)