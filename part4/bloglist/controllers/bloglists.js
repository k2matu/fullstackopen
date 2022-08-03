const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs);
});

blogRouter.post(
	"/",
	middleware.tokenExtractor,
	middleware.userExtractor,
	async (request, response) => {
		const body = request.body;
		const user = await request.user;

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
	}
);

blogRouter.delete(
	"/:id",
	middleware.tokenExtractor,
	middleware.userExtractor,
	async (request, response) => {
		const blog = await Blog.findById(request.params.id);
		const user = await request.user;

		if (blog.user.toString() === user._id.toString()) {
			await Blog.findByIdAndRemove(request.params.id);
			response.status(204).end();
		} else {
			response.status(401).json({ error: "unauthoritized action" });
		}
	}
);

blogRouter.put("/:id", async (request, response) => {
	const updatedBlog = await Blog.findOneAndUpdate(
		{ id: request.body.id },
		{ likes: request.body.likes },
		{ new: true }
	);
	response.json(updatedBlog);
});

module.exports = blogRouter;
