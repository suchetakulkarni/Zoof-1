var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs');
const { ObjectId } = mongoose.Schema;
var userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        maxlength: 50,
        trim: true
      },
      local: {
          email: String,
          password: String
      },
      userinfo:{
        type:String,
        trim:true
      },
      phone: {
        type:Number,
        
      },
      role: {
        type: Number,
        default: 0
      },
      order:
      [
        {
          products:[
            {
              productId: {
                type: ObjectId,
                ref:"products"
              },
              productName: {
                type: String,
                ref: "products"
              },
              productPrice: {
                type: Number,
                ref:"products"
              }
            }
          ],
          amount:{
            type: Number,
            default: 0,
          },
          address:{
            type: String
          },
          status: {
            type: String,
            default: "Recieved",
            enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
          }
        
      }
    ]

    }
  );

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);