import React ,{useState} from 'react'
import Base from '../core/Base'

import { Link } from 'react-router-dom'
import { isauthenticated } from '../auth/helper'
import { createCategory } from './helper/adminapicall'






const AddCategory=()=> {
   const [name,setName]=useState("")
   const[error,setError]=useState(false)
   const[success,setSuccess]=useState(false)

  //important stuff
   const{user,token}=isauthenticated()

   const goBack=()=>(
    <div className='mt-5'>
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
            Admin Home
        </Link>
    </div>      
    
    
    );

    const handleChange=(event)=>{
   setError("");
   setName(event.target.value)
    }
    const onSubmit=(event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false)

         //backend request fired

         createCategory(user._id,token,{name})
         .then(data=>{
            if(data.error){
                setError(true)
            }else{
                setError("")
                setSuccess(true)
                setName("")
            }
         })

         }
  const successMessage=()=>{
    if(success){
        return <h4 className="text-success">Category Created Successfully</h4>
    }
  }
  const warningMesssage=()=>{
    if(error){
        return <h4 className="text-warning">Failed to Create Category</h4>
    }

  }
   const myCategoryForm=()=>{
    return(
    <form>
        <div className="form-group">
            <p className="lead">Enter the Category</p>
            <input type="text" className="form-control my-3"
            onChange={handleChange}
            value={name}
         autoFocus 
         required
            placeholder='For Ex.Summer'
         />
         <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
        </div>
       
    </form>
    )
   }



  return (
    <Base title='Create Category here' 
    description='Add a New Category for New T-shirts'
    className='container bg-info p-4'
    
    >
   <div className="row bg-white rounded">
    <div className="col-md-8 offset-md-2">
    {successMessage()}
    {warningMesssage()}
    {myCategoryForm()} 
    {goBack()}
    
    
    </div>
   </div>
    </Base>
    
       
    



  
       
  )
}
 export default AddCategory