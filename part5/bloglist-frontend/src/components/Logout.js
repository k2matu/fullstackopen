import { useState } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";

const Logout = ({
	setUser,
	user,
	setBlogs,
	blogs,
	setErrorMessage,
	setSuccessMessage,
}) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem("loggedBlogAppUser");
	};

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
			setErrorMessage(`blog not added`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	return (
		<div>
			<h2>blogs</h2>
			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>
			<div>
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
			</div>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default Logout;
