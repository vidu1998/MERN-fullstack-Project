const express=require("express")
const router=express.Router();
//params
const {getUserById} =require("../controllers/user")
router.param("userId",getUserById)


const {isSignedIn,isAuthenticated}=require("../controllers/auth")
const{processPayment,getToken}=require("../controllers/paymentB")
router.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,getToken);

router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated,processPayment)


module.exports=router;