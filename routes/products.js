const express = require("express");
const router = express.Router();

const {
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUniqueCategories
  } = require("../controllers/products");
  const { isLoggedIn } = require("../controllers/user");
  const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.post(
    "/create/:userId",
    isLoggedIn,
    // isAuthenticated,
    //isAdmin,
    createProduct
  );
  router.delete(
    "/:productId/:userId",
    isLoggedIn,
    // isAuthenticated,
    // isAdmin,
    deleteProduct
  );
  
  //update route
  router.put(
    "/:productId/:userId",
    isLoggedIn,
    // isAuthenticated,
    // isAdmin,
    updateProduct
  );

  router.get("/:userId/all", getAllProducts);
  router.get("/:categoryId/products", getAllUniqueCategories);

  
module.exports = router;