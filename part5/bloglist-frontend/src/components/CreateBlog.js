import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({
	blogs,
	setBlogs,
	setErrorMessage,
	setSuccessMessage,
}) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const addBlog = async (event) => {
		event.preventDefault();

		try {
			const blog = await blogService.create({ title, author, url });
			setBlogs((blogs) => [...blogs, blog]);
			setTitle("");
			setAuthor("");
			setUrl("");
			setSuccessMessage(
				`${blog.title} by ${blog.author} has been added successfully`
			);
			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
		} catch (exception) {
			setErrorMessage(`blog has not been added successfully`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={() => setVisible(true)}>show</button>
			</div>
			<div style={showWhenVisible}>
				<h2>create new</h2>
				<form onSubmit={addBlog}>
					<div>
						title:{""}
						<input
							type="text"
							value={title}
							name="Title"
							onChange={({ target }) => setTitle(target.value)}
						/>
					</div>
					<div>
						author:{""}
						<input
							type="text"
							value={author}
							name="Author"
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</div>
					<div>
						url:{""}
						<input
							type="text"
							value={url}
							name="Url"
							onChange={({ target }) => setUrl(target.value)}
						/>
					</div>
					<button type="submit">create</button>
				</form>
				<button onClick={() => setVisible(false)}>hide</button>
			</div>
		</div>
	);
};

export default CreateBlog;
