var express = require('express');
var router = express.Router();
const userModel=require("./users");
const passport = require("passport")
const localStrategy=require("passport-local");
const upload=require("./multer")

passport.use(new localStrategy(userModel.authenticate()))


router.get('/', function(req, res, next) {
  res.render("index", { error: req.flash('error')});
});

router.post("/login",passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect:"/",
  failureFlash:true
}),function(req,res){ })

router.get('/register',function(req,res,next){
  res.render("register")
})

router.post("/register",function(req,res){
  const {username,email,fullname}=req.body;
  const userData=new userModel({username,email,fullname});
 
  userModel.register(userData,req.body.password).then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
})

router.get("/logout",function(req,res){
  req.logout(function(err){
    if (err){
      return next (err);
    }
    res.redirect('/')
  })
})

router.get('/profile',isLoggedIn,async function(req,res,next){
  const user=await userModel.findOne({username:req.session.passport.user})
  
  res.render('profile',{user , nav:true});
})

router.post('/fileupload',isLoggedIn,upload.single("image"),async function(req,res,next){
const user = await userModel.findOne({username:req.session.passport.user})
user.profileImage= req.file.filename;
await user.save();

res.redirect("/profile")
})

router.get("/add",isLoggedIn, async function(req,res,next){
  const user = await userModel.findOne({username: req.session.passport.user});
  res.render("add",{user,nav:true});
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())return next();
  res.redirect("/")
}

module.exports = router;
