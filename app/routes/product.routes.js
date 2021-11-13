const controller = require("../controllers/product.controller");
const upload = require("../utils/multer");

module.exports = function (app) {

  app.get("/api/product", controller.getProduct);

  const cpUpload = upload.fields([{ name: 'productThambnail', maxCount: 1 }, { name: 'productImgs', maxCount: 5 }])
  app.post("/api/product", cpUpload, controller.setProduct);

  app.put("/api/product", controller.editProduct);

  app.delete("/api/product", controller.deleteProduct);
};
