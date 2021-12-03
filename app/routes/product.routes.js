const controller = require("../controllers/product.controller");
const upload = require("../utils/multer");

module.exports = function (app) {

  var router = require("express").Router();

  app.use("/api/product", router);

  router.get("/", controller.getProduct);

  router.get("/:id", controller.getProductById);

  router.get("/hotProduct", controller.getHotProduct);

  router.get("/:productName", controller.searchProductByName);

  router.get("/:categoriesId", controller.getProductByCategory);

  const cpUpload = upload.fields([{ name: 'productThambnail', maxCount: 1 }, { name: 'productImgs', maxCount: 5 }])
  router.post("/", cpUpload, controller.setProduct);

  router.put("/", controller.editProduct);

  router.delete("/:id", controller.deleteProduct);
  
};
