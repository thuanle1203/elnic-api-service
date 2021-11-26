const controller = require("../controllers/sliders.controller");
const upload = require("../utils/multer");

module.exports = function (app) {

  app.get("/api/sliders", controller.findAll);

  app.get("/api/sliders/:id", controller.findOne);

  // app.get("/api/sliders/:id", controller.);

  const cpUpload = upload.fields([{ name: 'img', maxCount: 1 }])
  app.post("/api/sliders", cpUpload, controller.create);

  app.put("/api/sliders/:id", controller.update);

  app.delete("/api/sliders/:id", controller.delete);
};
