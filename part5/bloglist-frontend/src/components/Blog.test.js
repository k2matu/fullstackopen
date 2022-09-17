import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
	title: "A title",
	author: "An author",
	url: "A website",
	likes: 23,
	user: {
		name: "An user",
	},
};
const user = { name: "An user" };

test("renders title and author by default", () => {
	render(<Blog blog={blog} user={user} />);

	const element = screen.getByText("A title An author");
	expect(element).toBeDefined();
	expect(element).not.toContain("A website");
});
