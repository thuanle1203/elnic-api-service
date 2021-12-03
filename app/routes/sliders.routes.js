const controller = require("../controllers/sliders.controller");
const upload = require("../utils/multer");
var router = require("express").Router();

module.exports = function (app) {

  app.get("/", controller.findAll);

  app.get("/:id", controller.findOne);

  // app.get("/api/sliders/:id", controller.);

  const cpUpload = upload.fields([{ name: 'img', maxCount: 1 }])
  app.post("/", cpUpload, controller.create);

  app.put("/:id", controller.update);

  app.delete("/:id", controller.delete);

  app.use("/api/sliders", router);
};
