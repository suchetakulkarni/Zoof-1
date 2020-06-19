const User = require('../models/user')
const Product = require('../models/products')


exports.getOrderById = (req, res, next) => {
  let user = req.user
  User.findById(user._id).exec((err, purchase)=>{
    if(err){
      return res.status(400).json('Error')
    }
   else {
    console.log(purchase.order[1].products)
    }
  })
};



exports.pushOrderInUser = (req, res, next) => {
  let user = req.user
  let product = req.params.productId
  Product.findById(product).exec((err, products)=>{
    if(err){
      return res.json(400).json('Error')
    }
    let purchases = []
    purchases.push({
      productId: product,
      productName: products.name,
      productPrice: products.price
  })
    User.findOneAndUpdate(
      { _id: user._id },
      { $push: {order: [{products: {purchases}}] }},
      (err, purchases) => {
        if (err) {
          return res.status(400).json({error:'Unable to save'})
          }
        res.redirect('/order/cart')
      }
    );
  })

  
}


  // exports.pushOrderInPurchaseList = (req, res, next) => {
  //   let purchases = [];
  //     req.body.order.products.forEach(product => {
  //       purchases.push({
  //         _id: product._id,
  //         name: product.name,
  //         description: product.description,
  //         category: product.category,
  //         quantity: product.quantity,
  //         amount: req.body.order.amount,
  //         transaction_id: req.body.order.transaction_id
  //       });
    
  //     });
  
  //   //store this in DB
  //   User.findOneAndUpdate(
  //     { _id: req.profile._id },
  //     { $push: { purchases: purchases } },
  //     { new: true },
  //     (err, purchases) => {
  //       if (err) {
  //         return res.status(400).json({
  //           error: "Unable to save purchase list"
  //         });
  //       }
  //       next();
  //     }
  //   );
  // };
