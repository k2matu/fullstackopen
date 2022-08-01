const logger = require("./logger");

const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		request.token = authorization.substring(7);
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
};
