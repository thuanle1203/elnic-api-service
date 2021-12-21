const db = require("../models");
const Reviews = db.reviews;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const review = new Reviews({
    userId: req.body.userId,
    productId: req.body.productId,
    sumarry: req.body.sumarry,
    rating: Number(req.body.rating),
    status: req.body.status | true,
    username: req.body.username,
    userAvatar: req.body.userAvatar,
    bought: true
  });

  // Save Tutorial in the database
  Reviews
    .create(review)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Review.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

  Reviews.find()
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

  Reviews.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Reviews with id=${id}. Maybe Reviews was not found!`,
        });
      } else res.send({ message: "Reviews was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Reviews with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Reviews.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Reviews with id=${id}. Maybe Reviews was not found!`,
        });
      } else {
        res.send({
          message: "Reviews was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Reviews with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {

  Reviews.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Reviews!`,
        });
      } else
        res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error get Reviews",
      });
    });
};

exports.findOneByProductId = (req, res) => {

  Reviews.find({ productId: req.params.productId })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Reviews`,
        });
      } else
        res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error get Reviews",
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


// NOTE: Should get user information save to review to view fastest for product