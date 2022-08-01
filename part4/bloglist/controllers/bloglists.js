const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
	const body = request.body;

	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	const user = await User.findById(decodedToken.id);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
	});

	if (blog.title && blog.url) {
		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();

		response.status(201).json(savedBlog);
	} else {
		response.status(400).end();
	}
});

blogRouter.delete("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);

	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	const user = await User.findById(decodedToken.id);

	if (blog.user.toString() === user._id.toString()) {
		await Blog.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} else {
		response.status(401).json({ error: "unauthoritized action" });
	}
});

blogRouter.put("/:id", async (request, response) => {
	const updatedBlog = await Blog.findOneAndUpdate(
		{ id: request.body.id },
		{ likes: request.body.likes },
		{ new: true }
	);
	response.json(updatedBlog);
});

module.exports = blogRouter;
