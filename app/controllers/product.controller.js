const db = require("../models");
const Product = db.products;
const cloudinary = require("../utils/cloudinary");

exports.getProduct = (req, res) => {

  Product.find()
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Categories.",
    });
  });
};

exports.setProduct = async (req, res) => {
  try {
    // Validate request
    if (!req.body.productName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const productSlug = req.body.productName.toLowerCase().replace(" ", "-");

    const productThambnail = await cloudinary.uploader.upload(req.files['productThambnail'][0].path); 

    const productImgs = await Promise.all(req.files['productImgs'].map(async (img) => {
      try {
        const result = await cloudinary.uploader.upload(img.path);
        return result.secure_url;
      } catch(err) {
        throw err;
      }
    }));

    const product = new Product({
      productName: req.body.productName,
      productSlug: productSlug,
      productCode: makeid(5),
      productQty: req.body.productQty,
      productColor: req.body.productQty,
      productTag: req.body.productTag,
      productImgs: productImgs,
      discountPrice: req.body.discountPrice,
      sellingPrice: req.body.sellingPrice,
      shortDescp: req.body.shortDescp,
      longDescp: req.body.longDescp,
      productThambnail: productThambnail.secure_url,
      hotDeal: req.body.hotDeal ? req.body.hotDeal : false,
      featured: req.body.featured ? req.body.featured : false,
      status: req.body.status ? req.body.status : false,
      categoriesId: req.body.categoriesId,
      subCategoriesId: req.body.subCategoriesId,
      subSubCategoriesId: req.body.subSubCategoriesId,
    });

    await Product
      .create(product)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Hero.",
        });
      });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProduct = (req, res) => {

};

exports.editProduct = (req, res) => {

};

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}