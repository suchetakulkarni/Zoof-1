const Product = require("../models/products");
const { getUser , getUserById } = require('./user')


exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
      .populate("category")
      .exec((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Product not found"
          });
        }
        req.product = product;
        next();
      }); 
  };

  exports.createProduct = (req, res) => {
    const product = new Product(req.body);
    product.save((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save category in DB"
        });
      }
      res.json({ products });
    });
  };

  exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the product"
        });
      }
      res.json({
        message: "Deletion was a success",
        deletedProduct
      });
    });
  };

  exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
  
      //updation code
      let product = req.product;
      product = _.extend(product, fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
      // console.log(product);
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Updation of product failed"
          });
        }
        res.json(product);
      });
    });
  };

  exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  
    Product.find()
      // .select("-photo")
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec((err, products) => {
        if (err) {
          return res.status(400).json({
            error: "NO product FOUND"
          });
        }
        
        res.json(products)
      });
  };

  exports.getAllUniqueCategories = (req, res) => {
   let userId = req.user
    let categoryId = req.params.categoryId
    Product.find({"category":categoryId}, (err, products) => {
      if(!err){
        res.render('products.ejs', {products: products, userId:userId})
      }
    })
  };