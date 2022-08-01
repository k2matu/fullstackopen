const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");

beforeEach(async () => {
	await User.deleteMany({});

	const passwordHash = await bcrypt.hash("sekret", 10);
	const user = new User({ username: "k2matu", name: "kim", passwordHash });

	await user.save();
});

test("successfully created new user", async () => {
	const newUser = {
		username: "mluukkai",
		name: "Matti Luukkainen",
		password: "salainen",
	};

	await api
		.post("/api/users")
		.send(newUser)
		.expect(201)
		.expect("Content-Type", /application\/json/);
});

test("invalid user are not added", async () => {
	const newUser = {
		username: "he",
		password: "hem",
	};

	await api.post("/api/users").send(newUser).expect(400);
	const response = await api.get("/api/users");
	expect(response.body).toHaveLength(1);
});
