const db = require("../models");
const Coupons = db.coupons;

// Create and Save a new Tutorial
exports.createCoupon = (req, res) => {
  // Validate request
  if (!req.body.couponName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const couponValidity = new Date(req.body.couponValidity);
  // const couponValidity = now.setDate(now.getDate() + Number(req.body.couponValidity));

  // NOTE: Revert timestamp to date

  // var date = new Date(date1);
  // console.log(date.getDate());

  // Create a Tutorial
  const coupon = new Coupons({
    couponName: req.body.couponName,
    couponDiscount: req.body.couponDiscount,
    couponValidity: couponValidity,
    status: req.body.status | false
  });

  // Save Tutorial in the database
  Coupons
    .create(coupon)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Coupon.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

  Coupons.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving coupons.",
      });
    });
};

// Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findById(id)
//     .then((data) => {
//       if (!data)
//         res.status(404).send({ message: "Not found Tutorial with id " + id });
//       else res.send(data);
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Tutorial with id=" + id });
//     });
// };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Coupons.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Coupon with id=${id}. Maybe Coupon was not found!`,
        });
      } else res.send({ message: "Coupon was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Coupon with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Coupons.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Coupons with id=${id}. Maybe Coupons was not found!`,
        });
      } else {
        res.send({
          message: "Coupon was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Coupon with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.deleteMany({})
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
//   Tutorial.find({ published: true })
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
