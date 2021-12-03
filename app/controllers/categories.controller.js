const db = require("../models");
const axios = require("axios");
const Category = db.categories;
const SubCategory = db.subCategories;
const SubSubCategory = db.subSubCategories;

// Categories area

exports.getCategories = (req, res) => {

  Category.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Categories.",
      });
    });
};


exports.setCategories = (req, res) => {
  // Validate request
  if (!req.body.categoryName) {  
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const categoryName = req.body.categoryName;
  const categorySlug = categoryName.toLowerCase().replace(" ", "-");

  const categories = new Category({
    categoryName: categoryName,
    categorySlug: categorySlug,
    categoryIcon: req.body.categoryIcon,
  });

  Category
    .create(categories)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Categories.",
      });
    });
};

exports.deleteCategories = (req, res) => {
  if (!req.params.id) {
    return res.status(204).send({
      message: "Id to delete can not be empty!",
    });
  }

  try {
    Category.deleteOne( { _id : req.params.id } ).then(() => {
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

exports.editCategories = (req, res) => {

  const categoryName = req.body.categoryName;
  const categorySlug = categoryName.toLowerCase().replace(" ", "-");

  const categories = {
    categoryName: categoryName,
    categorySlug: categorySlug,
    categoryIcon: req.body.categoryIcon,
  };


  Category.findOneAndUpdate({ _id: req.params.id }, categories, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found!`,
        });
      } else
        res.status(200).send({ message: "Category was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Category with id=" + id,
      });
    });
};


exports.findOne = (req, res) => {

  Category.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Category with id=${id}!`,
        });
      } else
        res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error get Category with id=" + id,
      });
    });
};
// Sub Categories area

exports.getSubCategories = (req, res) => {

  SubCategory.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Sub Categories.",
      });
    });
};


exports.setSubCategories = (req, res) => {
  // Validate request
  if (!req.body.subCategoryName || !req.body.categoryId) {  
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const subCategoryName = req.body.subCategoryName;
  const subCategorySlug = subCategoryName.toLowerCase().replace(" ", "-");

  const subCategories = new SubCategory({
    subCategoryName: subCategoryName,
    subCategorySlug: subCategorySlug,
    subCategoryIcon: req.body.subCategoryIcon || '',
    categoryId: req.body.categoryId,
  });

  SubCategory
    .create(subCategories)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Categories.",
      });
    });
};

exports.deleteSubCategories = (req, res) => {

};

exports.editSubCategories = (req, res) => {
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

// Sub Sub Categories area

exports.getSubSubCategories = (req, res) => {

  SubSubCategory.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Sub Categories.",
      });
    });
};


exports.setSubSubCategories = (req, res) => {
  // Validate request
  if (!req.body.subSubCategoryName || !req.body.subCategoryId) {  
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const subSubCategoryName = req.body.subSubCategoryName;
  const subSubCategorySlug = subSubCategoryName.toLowerCase().replace(" ", "-");

  const subSubCategories = new SubSubCategory({
    subSubCategoryName: subSubCategoryName,
    subSubCategorySlug: subSubCategorySlug,
    subSubCategoryIcon: req.body.subSubCategoryIcon || '',
    subCategoryId: req.body.subCategoryId,
  });

  SubSubCategory
    .create(subSubCategories)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Sub Sub Categories.",
      });
    });
};

exports.deleteSubSubCategories = (req, res) => {

};

exports.editSubSubCategories = (req, res) => {
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
