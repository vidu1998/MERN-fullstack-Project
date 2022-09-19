
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isauthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/carthelper'
import { createOrder } from './helper/orderHelper'
import { getmeToken, processPayment } from './helper/paymentBhelper'
import DropIn from 'braintree-web-drop-in-react'





const PaymentB=({products,setreload=f=>f,reload=undefined})=> {

   const[info,setInfo]=useState({
    loading:false,
    success:false,
    clientToken:null,
    error: "",
    instance:{}

})
   const userId=isauthenticated() && isauthenticated().user._id;
   const token=isauthenticated() && isauthenticated().token;


   const getToken=(userId,token)=>{
     getmeToken(userId,token).then(info=>{
        // console.log("INFORMATION",info)
        if(info.error){
            setInfo({...info,error:info.error})
        }else{
            const clientToken=info.clientToken;
            setInfo({clientToken})
        }
     })
   }
   const showbtdropIn=()=>{
    return (
        <div>
            {info.clientToken !== null && products.length > 0 ? (
               <div>
                <DropIn
                options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
                             
                >

                </DropIn>
                <button className='btn btn-lg btn-block form-control btn-success'
                 onClick={onPurchase}>Buy</button>

               </div>
            ):(
                <h3>Please Login or something to Cart</h3>
            ) }
        </div>
    )
   }


   useEffect(()=>{
     getToken(userId,token)
   },[])
  
  const onPurchase=()=>{
    setInfo({loading:true})
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
        nonce = data.nonce;
        const paymentData = {
            paymentMethodNonce: nonce,
          amount: getAmount()
        };
        processPayment(userId,token,paymentData)
        .then(responce=>{
          setInfo({...info,success:responce.success,loading:false})

          console.log("payment Succes")
          const orderData={
            products:products,
            transaction_id:responce.transaction.id,
            amount:responce.transaction.amount,
          }
          createOrder(userId,token,orderData)

          cartEmpty(()=>{
            console.log("did We crash")
          })
          //TODO: empty the cart
          //TODO: force reload
          setreload(!reload)
        })

        .catch(error=>{
            setInfo({loading:false,success:false})
            console.log("payment Fail")
        })
    })
  }
 const getAmount=()=>{
    let amount=0
    products.map(p=>{
        amount=amount+p.price
    })

    return amount
 }
  return (
    <div>
       <h3>Your Bill is {getAmount()}</h3>
       {showbtdropIn()}
    </div>
  )
}
export default PaymentB