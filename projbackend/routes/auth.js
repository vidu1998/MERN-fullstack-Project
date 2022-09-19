const express = require('express')
const router = express.Router()
const{signout,signup,signin,isSignedIn}=require("../controllers/auth")
const {check,validationResult} = require('express-validator');
router.post("/signup",[
  check("name","name should be at least 3 chars").isLength({min:5}),
  check("email","email is required").isEmail(),
  check("password","Password field is required").isLength({min:3}),
],signup);
router.post("/signin",[
  
  check("email","email is required").isEmail(),
  check("password","Password should be at least 3 char").isLength({min:1}),
],signin)

router.get("/signout",signout)
 router.get("/testroute",isSignedIn, (req,res)=>{
  res.json(req.auth)
 })
module.exports=router;

