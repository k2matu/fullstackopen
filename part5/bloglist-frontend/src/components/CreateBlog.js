import { useState } from "react";

const CreateBlog = ({ setErrorMessage, setSuccessMessage, createBlog }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");
	// eslint-disable-next-line
	const [likes, setLikes] = useState(0);

	const addBlog = (event) => {
		event.preventDefault();

		try {
			createBlog({ title, author, url, likes });
			setTitle("");
			setAuthor("");
			setUrl("");
			setSuccessMessage(`${title} by ${author} has been added successfully`);
			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
		} catch (exception) {
			setErrorMessage("blog has not been added successfully");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addBlog}>
				<div>
					title:{""}
					<input
						id="title"
						type="text"
						value={title}
						name="Title"
						placeholder="write title here"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:{""}
					<input
						id="author"
						type="text"
						value={author}
						name="Author"
						placeholder="write author here"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:{""}
					<input
						id="url"
						type="text"
						value={url}
						name="Url"
						placeholder="write url here"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button id="create" type="submit">
					create
				</button>
			</form>
		</div>
	);
};

export default CreateBlog;
