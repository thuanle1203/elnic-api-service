const db = require("../models");
const Sliders = db.sliders;
const cloudinary = require("../utils/cloudinary");

exports.create = async (req, res) => {
  try {
    const imgUrl = await cloudinary.uploader.upload(req.files['img'][0].path); 

    const slider = new Sliders({
      title: req.body.title,
      description: req.body.description,
      imgUrl: imgUrl.secure_url,
      status: req.body.status | false
    });

    // Save Tutorial in the database
    Sliders
      .create(slider)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Coupon.",
        });
      });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Coupon.",
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

  Sliders.find()
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
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sliders.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Sliders with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Sliders with id=" + id });
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

  Sliders.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Slider with id=${id}. Maybe Slider was not found!`,
        });
      } else res.send({ message: "Slider was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Slider with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sliders.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Slider with id=${id}. Maybe Coupons was not found!`,
        });
      } else {
        res.send({
          message: "Slider was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Slider with id=" + id,
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


