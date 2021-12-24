const controller = require("../controllers/product.controller");
const upload = require("../utils/multer");

module.exports = function (app) {

  app.get("/api/product", controller.getProduct);

  app.get("/api/product/:id", controller.getProductById);

  app.get("/api/product/hotProduct", controller.getHotProduct);

  app.get("/api/product/search/:productName", controller.searchProductByName);

  app.get("/api/product/categories/:categoriesId", controller.getProductByCategory);

  const cpUpload = upload.fields([{ name: 'productThambnail', maxCount: 1 }, { name: 'productImgs', maxCount: 5 }])
  app.post("/api/product", cpUpload, controller.setProduct);

  app.post("/api/product/update", controller.editProduct);

  app.delete("/api/product/:id", controller.deleteProduct);
};
