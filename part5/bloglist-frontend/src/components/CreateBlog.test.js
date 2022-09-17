import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";

test("<CreateBlog /> updates parent state and calls onSubmit", async () => {
	const createBlog = jest.fn();
	const user = userEvent.setup();

	const setSuccessMessage = () => {
		return;
	};

	const setErrorMessage = () => {
		return;
	};

	let container;
	container = render(
		<CreateBlog
			createBlog={createBlog}
			setSuccessMessage={setSuccessMessage}
			setErrorMessage={setErrorMessage}
		/>
	).container;

	const input = container.querySelector("#title");
	const sendButton = screen.getByText("create");

	await user.type(input, "testing a form...");
	await user.click(sendButton);

	expect(createBlog.mock.calls).toHaveLength(1);
	expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
});
