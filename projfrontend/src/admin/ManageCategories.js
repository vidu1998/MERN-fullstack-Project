import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'
import { getCategories, } from './helper/adminapicall';
import { isauthenticated } from '../auth/helper';

const ManageCategories=()=> {
  
  const[categories,setcategories]=useState([]);

  const{user,token}=isauthenticated();
 
   const preload=()=>{
     getCategories().then(data=>{
         if(data.error){
             console.log(data.error);
         }else{
             setcategories(data)
         }
     })
   }
 
   useEffect(()=>{
      preload();
   },[])





  return (
<Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>
        {
          categories.map((category,index)=>{
            return(
              <h3 className="text-white" key={index}>{category.name}</h3>
            )
          })
        }
          <div className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left">I write code</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/productId`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {}} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Base>
  )
}

export default ManageCategories