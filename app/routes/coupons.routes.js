module.exports = (app) => {
  const coupons = require("../controllers/coupons.controller");

  var router = require("express").Router();

  app.use("/api/coupon", router);

  // Create a new Tutorial
  router.post("/", coupons.createCoupon);

  // Retrieve all Tutorials
  router.get("/", coupons.findAll);

  // Retrieve all published Tutorials
  // router.get("/published", coupons.findAllPublished);

  // Retrieve a single Tutorial with id
  // router.get("/:id", coupons.findOne);

  // Update a Tutorial with id
  router.put("/:id", coupons.update);

  // Delete a Tutorial with id
  router.delete("/:id", coupons.delete);

  // Create a new Tutorial
  // router.delete("/", coupons.deleteAll);

};
