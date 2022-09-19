const braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "tmdv2qpg3nbbfw25",
  publicKey: "yx36p6bv5t3c9rvn",
  privateKey: "fbc884905efcdd1a7b64703d61462abd"
});


exports.getToken=(req,res)=>{
    gateway.clientToken.generate({
        
      }, (err, response)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.send(response)
        }
      });
}

exports.processPayment=(req,res)=>{
    let nonceFromTheClient=req.body.paymentMethodNonce
    let amountFromTheClient=req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
       
        options: {
         submitForSettlement: true
        }
      }, (err, result) => {
        if(err){
            res.status(500).json(error)
        }else{
            res.json(result)
        }
      });
}