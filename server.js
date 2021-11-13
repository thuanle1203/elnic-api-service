const express = require("express");

const cors = require("cors");

const app = express();

const dotenv = require("dotenv");

const morgan = require("morgan");

const low = require("lowdb");

const swaggerUI = require("swagger-ui-express");

const swaggerJsDoc = require("swagger-jsdoc");

const db = require("./app/models");

// Add headers
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Connect DB

db.mongoose
  .connect(`mongodb+srv://user-test:12032000@cluster0.vxbdt.mongodb.net/api_service?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// Swagger

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:8080",
			},
		],
	},
	apis: ["./app/routes/*.routes.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(morgan("dev"));

// Simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Edward application." });
});

require("./app/routes/tutorial.routes")(app);
require("./app/routes/hero.routes")(app);
require("./app/routes/categories.routes")(app);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
