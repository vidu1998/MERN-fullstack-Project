const mongoose = require('mongoose');
require('dotenv').config()
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const cors=require("cors");

//my routes
const authRoutes=require("./routes/auth")
const userRoutes=require("./routes/user")
const categoryRoutes=require("./routes/category")
const productRoutes=require("./routes/product")
const orderRoutes=require("./routes/order")
const stripeRoutes=require("./routes/stripePayment")
const paymentBRoutes=require("./routes/paymentB")


//This is my DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(()=>{
    console.log("DB connected");
});

//This is my Midleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//my Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",stripeRoutes)
app.use("/api",paymentBRoutes)

//port
const port=process.env.port||8000;


//Starting a server
app.listen(port,()=>{
    console.log(`app is running ${port}`)
});

