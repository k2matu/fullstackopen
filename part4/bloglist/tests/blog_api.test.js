const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		blogs: 2,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		blogs: 1,
		__v: 0,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});
	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();
	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();
});

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
}, 100000);

test("blogs returns correct amount of blogs", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(initialBlogs.length);
}, 100000);

test("unique identifier property of the blog posts is named id", async () => {
	await api.get("/api/blogs");
	expect(initialBlogs[0]._id).toBeDefined(initialBlogs[0].id);
});

test("a valid blog can be added", async () => {
	const newBlog = {
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const response = await api.get("/api/blogs");
	const titles = response.body.map((r) => r.title);

	expect(response.body).toHaveLength(initialBlogs.length + 1);
	expect(titles).toContain("Canonical string reduction");
}, 100000);

test("if likes missing default value 0", async () => {
	const newBlog = {
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const response = await api.get("/api/blogs");
	const likes = response.body.map((r) => r.likes);

	expect(likes[2] === 0);
}, 100000);

test("note with missing title and url are not added", async () => {
	const newBlog = {
		author: "Robert C. Martin",
	};

	await api.post("/api/blogs").send(newBlog).expect(400);

	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(initialBlogs.length);
}, 100000);

test("blog deleted successfully", async () => {
	await api.delete("/api/blogs/5a422a851b54a676234d17f7").expect(204);
});

test("blog updated successfully", async () => {
	const newUpdate = {
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 2,
	};

	await api
		.put("/api/blogs/5a422a851b54a676234d17f7")
		.send(newUpdate)
		.expect(200);
}, 100000);

afterAll(() => {
	mongoose.connection.close();
});
