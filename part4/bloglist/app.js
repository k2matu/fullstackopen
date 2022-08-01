const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const blogRouter = require("./controllers/bloglists");
const morgan = require("morgan");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

app.use(cors());
// app.use(express.static("build"));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogRouter);

module.exports = app;
