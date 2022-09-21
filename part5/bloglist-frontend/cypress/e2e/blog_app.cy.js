describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user = {
			name: "Matti Luukkainen",
			username: "mluukkai",
			password: "salainen",
		};
		cy.request("POST", "http://localhost:3003/api/users/", user);
		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		cy.contains("log in to application");
	});

	it("succeeds with correct credentials", function () {
		cy.get("#username").type("mluukkai");
		cy.get("#password").type("salainen");
		cy.contains("login").click({ force: true });

		cy.contains("Matti Luukkainen logged in");
	});

	it("fails with wrong credentials", function () {
		cy.get("input:first").type("mluukkai");
		cy.get("input:last").type("wrong");
		cy.contains("login").click();

		cy.contains("Wrong credentials");
	});

	describe("when logged in", function () {
		beforeEach(function () {
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("salainen");
			cy.contains("login").click({ force: true });
		});

		it("A blog can be created, liked and removed", function () {
			cy.contains("new blog").click();
			cy.get("#title").type("a title");
			cy.get("#author").type("a author");
			cy.get("#url").type("a url");
			cy.get("#create").click();

			cy.contains("likes: 0");
			cy.contains("a title a author");
			cy.contains("a title by a author has been added successfully");
			cy.contains("view").click();
			cy.contains("like").click();

			cy.contains("likes: 1");

			cy.reload();
			cy.contains("view").click();
			cy.contains("user: Matti Luukkainen");
			cy.contains("remove").click();
			cy.contains("a title by a author has been removed successfully");
		});

		it("blogs are sorted in correct order", function () {
			cy.contains("new blog").click();
			cy.get("#title").type("a title");
			cy.get("#author").type("a author");
			cy.get("#url").type("a url");
			cy.get("#create").click();

			cy.contains("new blog").click();
			cy.get("#title").type("new blog");
			cy.get("#author").type("new author");
			cy.get("#url").type("new url");
			cy.get("#create").click();
			cy.reload();

			cy.get(".blog").eq(0).should("contain", "a title a author");
			cy.get(".blog").eq(1).should("contain", "new blog new author");

			cy.get(".blog").eq(1).contains("view").click();
			cy.get(".blog").eq(1).contains("like").click();

			cy.reload();
			cy.get(".blog").eq(0).should("contain", "new blog new author");
			cy.get(".blog").eq(1).should("contain", "a title a author");
		});
	});
});
