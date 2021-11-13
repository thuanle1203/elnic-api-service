const db = require("../models");
const User = db.user;

exports.getProduct = (req, res) => {

  const condition = [
    {
      $lookup: {
        from: 'roles',
        localField: 'roles',
        foreignField: '_id',
        as: 'roles'
      }
    }
  ];

  User.aggregate(condition).then((data) => {
    if (!data) {
      res.status(404).send({
        message: `Not have any user here`,
      });
    } else
      res.status(200).send({ data });
  })
  .catch((err) => {
    res.status(500).send({
      message: "Error get User",
    });
  });
};


exports.setProduct = (req, res) => {

};

exports.deleteProduct = (req, res) => {

};

exports.editProduct = (req, res) => {
  User.findOneAndUpdate({ username: req.body.username }, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else
        res.status(200).send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};
