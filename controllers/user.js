const User = require("../models/user");
const Product = require('../models/products')
const { getProductById } = require('../controllers/products')

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      console.log(err)
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = '';
    return res.json(req.profile);
};

exports.userPurchaseList = (req, res) => {
    let userId = req.user
    User.find({"order":{}},{ _id: req.userId._id })
      .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "No Order in this account"
          });
        }
        res.json(order)
      });
  };

  