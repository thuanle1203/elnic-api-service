const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.heroes = require("./hero.model.js")(mongoose);
db.categories = require("./categories.model.js")(mongoose);
db.subCategories = require("./subCategories.model.js")(mongoose);
db.subSubCategories = require("./subSubCategories.model.js")(mongoose);
db.products = require("./products.model.js")(mongoose);
db.coupons = require("./coupons.model.js")(mongoose);
db.reviews = require("./reviews.model.js")(mongoose);
db.orders = require("./orders.model.js")(mongoose);

module.exports = db;
