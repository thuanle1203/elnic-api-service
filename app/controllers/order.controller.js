const db = require("../models");
const Orders = db.orders;
const Product = db.products;
const axios = require("axios");
const { products } = require("../models");

// Create and Save a new Tutorial
exports.create = async (req, res) => {

  let mess;
  let user;

  if (req.body.username) {
    const reqQuery = process.env.AUTH_SERVICE + "/api/user/getByIdOrUsername?username=" + req.body.username;
    try {
      mess = await axios.get(reqQuery).catch((error) => {
        throw error;
      });
      user = mess.data;
    } catch(err) {
      res.status(500).send({
        message: err,
      });
    }
  } else {
    const reqQuerry = process.env.AUTH_SERVICE + "/api/user/createUser";
    try {
      mess = await axios.post(reqQuerry, {
        email: req.body.email,
        phone: req.body.phone,
        fullName: req.body.fullName
      }).catch((error) => {
        throw error;
      });

      user = mess.data.data;

    } catch(err) {
      res.status(500).send({
        message: err,
      });
    }
  }

  if (!req.body.productList) {
    return res.status(400).send({
      message: "Data to Product List can not be empty!",
    });
  }
  
  const productList = [];

  const products = await Promise.all(req.body.productList.map(async (product) => {
    await Product.findOneAndUpdate({
      _id: product._id,
      productQty: { $gt: Number(product.userQuantity) - 1 }
    }, { 
      $inc: { productQty : -Number(product.userQuantity) }
    }).then((data) => {
      if (data)
      productList.push(product);
    })
  }));

  if (productList.length < req.body.productList.length) {
    return res.status(404).send({
      message: "Data to Product List qty not suitable!",
    });
  }

  const order = new Orders({
    userId: req.body.userId || user._id,
    email: req.body.email || user.email,
    phone: req.body.phone || user.phone,
    fullName: req.body.fullName || user.fullName,
    productList: productList,
    note: req.body.note,
    postCode: req.body.postCode,
    paymentType: req.body.paymentType,
    paymentMethod: req.body.paymentMethod,
    transactionId: req.body.transactionId,
    currency: req.body.currency,
    amount: req.body.amount,
    country: req.body.country,
    address: req.body.address,
    orderNumber: req.body.orderNumber,
    invoiceNo: req.body.invoiceNo,
    orderDate:  new Date(),
    confirmDate: req.body.confirmDate,
    shippedDate: req.body.shippedDate,
    cancelDate: req.body.cancelDate,
    cancelReason: req.body.cancelReason,
    status: req.body.status,
  });
  
  Orders
    .create(order)
    .then((data) => {
      res.status(201).send(data);
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    let mess = await axios
      .get(process.env.AUTH_SERVICE + "/api/user/getByIdOrUsername?username=admin")
      .catch((error) => {
        throw error;
      });
    mess = mess.data;
    
    Orders.find()
    .then((data) => {
      res.send({ ...data, ...mess });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders.",
      });
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving orders.",
    });  
  }
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Orders.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Order with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Order with id=" + id });
    });
};

exports.findOneByUserId = (req, res) => {
  const userId = req.params.id;

  Orders.find({ userId: userId })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Order with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Order with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Orders.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Orders.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};



// Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Orders.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Tutorials were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials.",
//       });
//     });
// };

// Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Orders.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };
