const controller = require("../controllers/product.controller");
const upload = require("../utils/multer");
var router = require("express").Router();

module.exports = function (app) {

  app.get("/", controller.getProduct);

  app.get("/:id", controller.getProductById);

  app.get("/hotProduct", controller.getHotProduct);

  app.get("/:productName", controller.searchProductByName);

  app.get("/:categoriesId", controller.getProductByCategory);

  const cpUpload = upload.fields([{ name: 'productThambnail', maxCount: 1 }, { name: 'productImgs', maxCount: 5 }])
  app.post("/", cpUpload, controller.setProduct);

  app.put("/", controller.editProduct);

  app.delete("/:id", controller.deleteProduct);
  
  app.use("/api/product", router);
};
