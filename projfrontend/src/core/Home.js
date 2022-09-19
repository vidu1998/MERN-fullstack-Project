import React,{useState,useEffect}from 'react'
import "../styles.css"

import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'

export default function Home() {

   const[products,setProducts]=useState([])
   const[error,setError]=useState(false)

   const loadAllProduct=()=>{
     getProducts().then(data=>{
        if(data.error){
            setError(data.error)
        }else{
            setProducts(data)
        }
     })
   }
   useEffect(()=>{
    loadAllProduct()
   },[]
   )
     
    return (
    <Base title="Home PAGE" description='Welcome to T shirt Store'>
    <div className="row text-center">
        <h1 className="text-white">All of T-SHirt</h1>
        <div className="row">
            {products.map((product,index)=>{
                return(
                    <div key={index} className="col-4 mb-4">
                      <Card product={product}></Card>
                    </div>
                )
            })}
        </div>
    </div>
    </Base>
  )
}
