import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import Togglable from "./Togglable";

const blog = {
	title: "A title",
	author: "An author",
	url: "A website",
	likes: 23,
	user: {
		name: "An user",
	},
};
const user = { name: "A user" };

test("renders title and author by default", () => {
	render(<Blog blog={blog} user={user} />);

	const element = screen.getByText("A title An author");
	expect(element).toBeDefined();
});

test("clicking the button calls event handler", async () => {
	const mockHandler = jest.fn();
	render(<Blog blog={blog} user={user} toggleVisibility={mockHandler} />);

	const person = userEvent.setup();
	const button = screen.getByText("view");
	await person.click(button);

	expect(mockHandler.mock.calls).toHaveLength(1);
});

// describe("<Togglable />", () => {
// 	let container;

// 	beforeEach(() => {
// 		render(<Blog blog={blog} user={user} />);

// 		container = render(
// 			<Togglable>
// 				<div className="testDiv">togglable content</div>
// 			</Togglable>
// 		).container;
// 	});

// 	test("at start the children are not displayed", () => {
// 		const div = container.querySelector(".togglableContent");
// 		expect(div).toHaveStyle("display: none");
// 	});

// test("after clicking the button, children are displayed", async () => {
// 	const user = userEvent.setup();
// 	const button = screen.getByRole("button", { name: /view/i });
// 	await user.click(button);

// 	const div = container.querySelector(".togglableContent");
// 	expect(div).toHaveStyle("display: none");
// });
// });
