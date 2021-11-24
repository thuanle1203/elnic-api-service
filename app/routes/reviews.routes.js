module.exports = (app) => {
  const reviews = require("../controllers/reviews.controler");

  var router = require("express").Router();

  app.use("/api/review", router);

  // Create a new Tutorial
  router.post("/", reviews.create);

  // Retrieve all Tutorials
  router.get("/", reviews.findAll);

  // Retrieve all published Tutorials
  // router.get("/published", coupons.findAllPublished);

  // Retrieve a single Tutorial with id
  // router.get("/:id", coupons.findOne);

  // Update a Tutorial with id
  router.put("/:id", reviews.update);

  // Delete a Tutorial with id
  router.delete("/:id", reviews.delete);

  // Create a new Tutorial
  // router.delete("/", coupons.deleteAll);

};
