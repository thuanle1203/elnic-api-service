module.exports = (app) => {
  const orders = require("../controllers/order.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", orders.create);

  // Retrieve all Tutorials
  router.get("/", orders.findAll);

  // Retrieve all published Tutorials
  // router.get("/published", orders.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", orders.findOne);

  router.get("/getByUserId/:id", orders.findOneByUserId);

  // Update a Tutorial with id
  router.put("/:id", orders.update);

  // Delete a Tutorial with id
  router.delete("/:id", orders.delete);

  // Create a new Tutorial
  // router.delete("/", orders.deleteAll);

  app.use("/api/orders", router);
};
