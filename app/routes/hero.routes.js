const heroes = require("../controllers/hero.controller.js");
const { verifyToken } = require("../middlewares/authJwt");
const axios = require("axios");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

/**
 * @swagger
 * components:
 *   schemas:
 *     Hero:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The Hero Name
 *         age:
 *           type: number
 *           description: The Hero age
 *         userId:
 *           type: string
 *           description: The user id
 *         tthn:
 *           type: string
 *           description: The tthn
 *         address:
 *           type: string
 *           description: The address
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */


module.exports = (app) => {
  var router = require("express").Router();
  app.use("/api/heroes", router);
    
  /**
    * @swagger
    * tags:
    *   name: Heros
    *   description: The heros managing API
    */

  /**
   * @swagger
   * /:
   *   get:
   *     summary: Returns the list of all the books
   *     tags: [Heros]
   *     responses:
   *       200:
   *         description: The list of the books
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Hero'
   */

  router.get("/", heroes.findAll);

  router.get("/published", heroes.findAllPublished);

  router.get("/tagCount", heroes.getTagCount);

  router.get("/:userId", heroes.findAllByUserId);

  router.post("/", heroes.create);

  router.post("/multiDelete", heroes.multiDelete);

  router.post("/deleteTag", heroes.deleteTag);

  router.put("/", heroes.update);

  router.put("/updateTag", heroes.updateTag);

  router.put("/updateEmail", async (req, res, next) => {
    try {
      let mess = await axios
        .put("http://nodejsjwtauthmongodb:8081/api/updateUser", {
          username: req.body.username,
          email: req.body.email,
        })
        .catch((error) => {
          throw error;
        });
      mess = mess.data;
      res.status(200).send(mess);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/", [verifyToken], heroes.deleteAll);

  router.delete("/:id", [verifyToken], heroes.delete);
  
  router.post("/image", upload.single("image"), async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Create new user
      let user = {
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      };
      // Save user
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  });
  
  router.delete("/image", async (req, res) => {
    try {
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(user.cloudinary_id);
      // Delete user from db
      res.json({ success: 1 });
    } catch (err) {
      console.log(err);
    }
  });
  
  router.put("/image", upload.single("image"), async (req, res) => {
    try {
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(user.cloudinary_id);
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      const data = {
        avatar: result?.secure_url,
        cloudinary_id: result?.public_id,
      };
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  });
};
