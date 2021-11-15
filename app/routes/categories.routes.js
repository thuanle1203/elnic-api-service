const categories = require("../controllers/categories.controller.js");
// const { verifyToken } = require("../middlewares/authJwt");
// const axios = require("axios");

module.exports = (app) => {
  var router = require("express").Router();
  app.use("/api", router);

  // Category area

  router.get("/categories", categories.getCategories);

  router.post("/categories", categories.setCategories);

  router.put("/categories/:id", categories.editCategories);

  router.delete("/categories/:id", categories.deleteCategories);

  // Sub Category area

  router.get("/subCategories", categories.getSubCategories);

  router.post("/subCategories", categories.setSubCategories);

  // Sub Sub Category area

  router.get("/subSubCategories", categories.getSubSubCategories);

  router.post("/subSubCategories", categories.setSubSubCategories);

  //Sub Sub Category area

  // router.get("/tagCount", heroes.getTagCount);

  // router.get("/:userId", heroes.findAllByUserId);

  // router.post("/", heroes.create);

  // router.post("/multiDelete", heroes.multiDelete);

  // router.post("/deleteTag", heroes.deleteTag);

  // router.put("/", heroes.update);

  // router.put("/updateTag", heroes.updateTag);

  // router.put("/updateEmail", async (req, res, next) => {
  //   try {
  //     let mess = await axios
  //       .put("http://nodejsjwtauthmongodb:8081/api/updateUser", {
  //         username: req.body.username,
  //         email: req.body.email,
  //       })
  //       .catch((error) => {
  //         throw error;
  //       });
  //     mess = mess.data;
  //     res.status(200).send(mess);
  //   } catch (err) {
  //     next(err);
  //   }
  // });

  // router.delete("/", [verifyToken], heroes.deleteAll);

  // router.delete("/:id", [verifyToken], heroes.delete);
};
