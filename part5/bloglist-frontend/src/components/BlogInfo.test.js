import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogInfo from "./BlogInfo";

test("clicking like button twice calls event handler twice", async () => {
	const blog = {
		title: "A title",
		author: "An author",
		url: "A website",
		likes: 23,
		user: {
			name: "An user",
		},
	};

	const mockHandler = jest.fn();

	render(<BlogInfo blog={blog} updateLikes={mockHandler} />);

	const user = userEvent.setup();
	const button = screen.getByText("like");
	await user.dblClick(button);

	expect(mockHandler.mock.calls).toHaveLength(2);
});
