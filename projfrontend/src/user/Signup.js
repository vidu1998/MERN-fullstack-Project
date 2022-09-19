import React,{useState} from 'react'

import Base from "../core/Base"
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'

const Signup=()=>{


 const [values,setValues] =useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false,
 })
 const {name,email,password,error,success}=values;

  const handleChange =name=>event=>{
    setValues({...values,error:false,[name]:event.target.value})
  }

   const onSubmit=event=>{
    event.preventDefault();
    setValues({...values,error:false})
    signup({name,email,password})
    .then(data=>{
        if(data.error){
            setValues({...values,error:data.error,success:false})
        }else{
            setValues({
                ...values,
                name:"",
                email:"",
                password:"",
                error:"",
                success:true
            })
        }
    })
    .catch(console.log("Error in Sign Up"))
   }
   const signUpForm=()=>{
    return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Name</label>
                        <input className='form-control' type="text"
                         onChange={handleChange("name")} 
                            value={name}
                         />
                    </div>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input className='form-control' type="email" 
                            onChange={handleChange("email")}
                            value={email}
                        />
                    </div>
                    <div className="form-group pb-3">
                        <label className="text-light">Password</label>
                        <input className='form-control' type="password" 
                            onChange={handleChange("password")}
                            value={password}
                        />
                    </div>
                
                    <button onClick={onSubmit} className="btn btn-success btn-lg btn-block form-control">Submit</button>
             
                </form>
            </div>
        </div>
    )
   }
   const sucessMessage=()=>
   {
    return(
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left  ">
    <div className="alert alert-success form-control"

     style={{display:success ? "": "none"}}
       >
       New Account Created Successfully.Please {" "} 
      <Link to="/signin">Login Here </Link> 
    </div>
    </div>
    </div>
  )}
   const errorMessage=()=>

   {
    return(
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-center ">
    <div className="alert alert-danger form-control "

     style={{display:error ? "": "none"}}
       >
       {error}
    </div>
    </div>
    </div>
    
   )}

    return(
        <Base title="Sign up Page" description='A Page for User to Signup!'>
              {sucessMessage()}
              {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup;