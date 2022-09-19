import React,{useState} from 'react'

import Base from "../core/Base"
import { Link ,Redirect} from 'react-router-dom';

import {signin,authenticate,isauthenticated} from "../auth/helper"
const Signin=()=>{

    const [values,setValues]=useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false //whter admin or user
    })

    const {email,password,error,loading,didRedirect} =values;
    const{user}=isauthenticated();

    const onSubmit=event=>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }else{
                authenticate(data,()=>{
                    setValues({
                        ...values,
                        didRedirect:true
                    })
                })
            }
        }

        )
        .catch(console.log("signin Request Failed"))
    }
     const performRedirect=()=>{
        
        if(didRedirect){
            if(user && user.role === 1){
                   return <Redirect to="/admin/dashboard" ></Redirect>
            }else{
                return <Redirect to="/user/dashboard" ></Redirect>   
            }
        }
        if(isauthenticated()){
            return <Redirect to="/"></Redirect>
        }
     }
    const handleChange =name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
      }
      const loadingMessage=()=>
      {
       return(
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
       );
     };
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
   

     
    const signInForm=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                     
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className='form-control' type="email" 
                            value={email}
                            onChange={handleChange("email")}
                            />
                        </div>
                        <div className="form-group pb-3">
                            <label className="text-light">Password</label>
                            <input className='form-control' type="password" 
                             value={password}   
                            onChange={handleChange("password")}
                            />
                        </div>
                    
                        <button onClick={onSubmit} className="btn btn-success btn-lg btn-block form-control">Submit</button>
                 
                    </form>
                </div>
            </div>
        )
       }
    

    return(
        <Base title="Sign in Page" description='A Page for User to SignIn!'>
           {loadingMessage()}
           {errorMessage()}                 
           {signInForm()}
           {performRedirect()}
           <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;