const express = require("express");
const router = express.Router();
const {
  displayCategories,
  createCategory,
  updateCategory,
  removeCategory
} = require("../controllers/category");
const { isLoggedIn, getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.get("/all", displayCategories);

router.post(
    "/create/:userId",
    isLoggedIn,
    //  isAdmin,
    createCategory
);

router.put(
    "/:categoryId/:userId",
    isLoggedIn,
    updateCategory
  );


  router.delete(
    "/:categoryId/:userId",
    isLoggedIn,
    removeCategory
  );
  
  module.exports = router;