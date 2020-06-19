const User = require('../models/user')
const Product = require('../models/products')


exports.getOrderById = (req, res, next) => {
  let user = req.user
  User.findById(user._id).exec((err, purchase)=>{
    if(err){
      return res.status(400).json('Error')
    }
   else {
      let amount =0
      purchase.order.forEach(function(total){
        amount+=total.products[0].productPrice
      })
      if(user){
          User.findById(user._id,(err, newUser)=>{
              let lengths = Object.keys(newUser.order).length
              res.render('cart', {purchase:purchase.order, amount:amount, lengths:lengths} )
      })
  }
      
    }
  })
};

exports.pushOrderInUser = (req, res, next) => {
  let user = req.user
  let product = req.params.productId
  Product.findById(product).exec((err, productss)=>{
    if(err){
      return res.json(400).json('Error')
    }
    let purchases = []
    purchases.push({
      productId: product,
      productName: productss.name,
      productPrice: productss.price
  })
    User.findById(user._id,(err, userOrder)=>{
      User.findOneAndUpdate(
        { _id: user._id },
        {$push: {order: {products: purchases}} },
        (err, purchase) => {
          if (err) {
            return res.status(400).json({error:'Unable to save'})
            }
            res.redirect('/order/cart')
        }
      )
    })
    ;
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
