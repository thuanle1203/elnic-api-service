const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");

module.exports = function (app) {

  app.get("/api/product", controller.getProduct);

  app.post("/api/product", controller.setProduct);

  app.put("/api/product", controller.editProduct);

  app.delete("/api/product", controller.deleteProduct);
};
