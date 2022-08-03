const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		request.token = authorization.substring(7);
	} else {
		response.status(401).json({ error: "token missing" });
	}

	next();
};

const userExtractor = (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		response.status(401).json({ error: "token missing or invalid" });
	} else {
		request.user = User.findById(decodedToken.id);
	}

	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
	logger.error("errorname", error.username);
	if (request.username === "ValidationError") {
		return response.status(400).send({ error: error.message });
	}

	next(error);
};

module.exports = {
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
};
