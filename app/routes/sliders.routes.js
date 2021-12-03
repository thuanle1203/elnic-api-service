const controller = require("../controllers/sliders.controller");
const upload = require("../utils/multer");
var router = require("express").Router();

module.exports = function (app) {

  router.get("/", controller.findAll);

  router.get("/:id", controller.findOne);

  // app.get("/api/sliders/:id", controller.);

  const cpUpload = upload.fields([{ name: 'img', maxCount: 1 }])
  router.post("/", cpUpload, controller.create);

  router.put("/:id", controller.update);

  router.delete("/:id", controller.delete);

  app.use("/api/sliders", router);
};
