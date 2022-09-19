import React,{useState,useEffect}from 'react'
import "../styles.css"

import Base from './Base'
import { loadCart } from './helper/carthelper'
import Card from './Card'
import StripeCheckout from './StripeCheckout'
import PaymentB from './PaymentB'

const Cart=()=> {

   const[products,setProducts]=useState([])
   const[reload,setreload]=useState(false)

   useEffect(()=>{
     setProducts(loadCart())
   },[reload])
   const loadAllProducts=products=>{
    return(
        <div>
            <h2>This Section is to Load Products</h2>
            {products.map((product,index) => (
                <Card
                key={index}
                product={product}
                removefromCart={true}
                addtoCart={false}
                setReload={setreload}
                reload={reload}
                ></Card>
            ))}
        </div>                 
    )
   }

   
     
    return (
    <Base title="Cart Page" description='Ready to CHeckout'>
    <div className="row text-center">
        <div className="col-6">
      {products.length>0?(loadAllProducts(products)):(<h3>No Product Found</h3>)}
        </div>
         <div className="col-6">
         <StripeCheckout
         products={products}
        setReload={setreload}         
         ></StripeCheckout>

         <br></br>
         <PaymentB products={products} setreload={setreload}></PaymentB>
        </div>
    </div>
    </Base>
  )
}
export default Cart