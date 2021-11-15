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
  if (!req.params.id) {
    return res.status(204).send({
      message: "Id to delete can not be empty!",
    });
  }

  try {
    Product.deleteOne( { _id : req.params.id } ).then(() => {
      res.status(200).send({
        message: "Delete successfuly.",
      });
    });
 } catch (e) {
  res.status(500).send({
    message: e.message || "Some error occurred while retrieving id.",
  });
 }
};

exports.editProduct = (req, res) => {
  if (!req.body) {
    return res.status(204).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.body._id;

  const productSlug = req.body.productName.toLowerCase().replace(" ", "-");
  
  const product = {
    productName: req.body.productName,
    productSlug: productSlug,
    productQty: req.body.productQty,
    productColor: req.body.productColor,
    productTag: req.body.productTag,
    discountPrice: req.body.discountPrice,
    sellingPrice: req.body.sellingPrice,
    shortDescp: req.body.shortDescp,
    longDescp: req.body.longDescp,
    hotDeal: req.body.hotDeal ? req.body.hotDeal : false,
    featured: req.body.featured ? req.body.featured : false,
    status: req.body.status ? req.body.status : false,
    categoriesId: req.body.categoriesId,
    subCategoriesId: req.body.subCategoriesId,
    subSubCategoriesId: req.body.subSubCategoriesId,
  };

  Product.updateOne(
    { _id: id },
    { $set: product }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Tutorial was not found!`,
        });
      } else
        res.status(200).send({ message: "Product was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  Product.find({ _id: id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categoriesId.",
      });
    });
};

exports.getProductByCategory = (req, res) => {
  const categoriesId = req.params.categoriesId;
  Product.find({ categoriesId: categoriesId })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categoriesId.",
      });
    });
};

exports.getHotProduct = (req, res) => {
  Product.find({ hotDeal: { $eq: true } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categoriesId.",
      });
    });
};

exports.searchProductByName = (req, res) => {
  const productNameRegex = new RegExp(req.params.productName, 'i');
  Product.find({ productName: productNameRegex })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categoriesId.",
      });
    });
};

exports.search = (req, res) => {
  Product.find({ hotDeal: { $eq: true } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categoriesId.",
      });
    });
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

// Iterate through each element in the
// first array and if some of them
// include the elements in the second
// array then return true.
function findCommonElements(arr1, arr2) {
  return arr1.some(item => arr2.includes(item))
}