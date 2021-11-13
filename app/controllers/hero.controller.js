const db = require("../models");
const axios = require("axios");
const Hero = db.heroes;

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Hero.find(condition)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving heroes.",
      });
    });
};

exports.findAllByUserId = (req, res) => {
  const userId = req.params.userId;
  Hero.find({ userId: userId })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving heroes.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Hero.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Hero with id " + id });
      } else res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Hero with id=" + id });
    });
};

exports.getTagCount = (req, res) => {
  Hero.aggregate([
    { $unwind: "$tag" },
    { $group: { _id: "$tag", count: { $sum: 1 } } },
    { $project: { count: 1 } },
  ]).then((data) => {
    if (!data) {
      res.status(404).send({ message: "Not found any Tag" });
    } else res.status(200).send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Hero.find({ published: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving heros.",
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const hero = new Hero({
    name: req.body.name,
    age: Number(req.body.age),
    tthn: req.body.tthn ? req.body.tthn : false,
    address: req.body.address,
    userId: req.body.userId,
  });

  hero
    .save(hero)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Hero.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(204).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.body._id;

  Hero.findByIdAndUpdate(
    id,
    { name: req.body.name, address: req.body.address, age: req.body.age },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Hero with id=${id}. Maybe Tutorial was not found!`,
        });
      } else
        res.status(200).send({ message: "Hero was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Hero with id=" + id,
      });
    });
};

exports.updateEmail = (req, res) => {
  const authResponse = [];

  axios
    .get("http://nodejsjwtauthmongodb:8081/api/test/all")
    .then((response) => (authResponse = response))
    .catch((error) => {
      throw error;
    });

  res.status(200).send(authResponse);
};

exports.updateTag = (req, res) => {
  Hero.updateMany(
    { _id: { $in: req.body.list_id } },
    { $push: { tag: req.body.tags } }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Hero. Maybe Hero was not found!`,
        });
      } else
        res.status(200).send({ message: "Hero was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Hero",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Hero.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Hero with id=${id}. Maybe Hero was not found!`,
        });
      } else {
        res.status(200).send({
          message: "Hero was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Hero with id=" + id,
      });
    });
};

exports.multiDelete = (req, res) => {
  Hero.deleteMany({ _id: { $in: req.body.list_id } })
    .then((data) => {
      res.status(200).send({
        message: `${data.deletedCount} Heros were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing herose.",
      });
    });
};

exports.deleteAll = (req, res) => {
  Hero.deleteMany({})
    .then((data) => {
      res.status(200).send({
        message: `${data.deletedCount} Heros were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all herose.",
      });
    });
};

exports.deleteTag = (req, res) => {
  Hero.updateMany(
    { _id: { $in: req.body.list_id } },
    { $pullAll: { tag: req.body.tags } }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Hero. Maybe Hero was not found!`,
        });
      } else
        res.status(200).send({ message: "Hero was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Hero",
      });
    });
};


