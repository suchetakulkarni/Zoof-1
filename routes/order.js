const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../controllers/user");
const{ pushOrderInUser, getOrderById } = require('../controllers/order')

  router.post(
    "/create/:productId",
    isLoggedIn,
    // updateStock,
    pushOrderInUser
  );

  router.get('/cart',isLoggedIn, getOrderById)

  module.exports = router;