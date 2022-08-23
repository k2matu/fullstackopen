import { useState } from "react";
import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, user }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const showDelete = { display: blog.user.name === user.name ? "" : "none" };

	const updateLikes = () => {
		const changedLikes = {
			user: blog.user.id,
			likes: blog.likes + 1,
			author: blog.author,
			title: blog.title,
			url: blog.url,
		};

		blogService.update(blog.id, changedLikes).then((returnedBlog) => {
			setBlogs(
				blogs.map((elem) =>
					elem.title !== changedLikes.title ? elem : returnedBlog
				)
			);
		});
	};

	const deleteBlog = async () => {
		if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
			await blogService.remove(blog.id);
			setBlogs(blogs.filter((elem) => elem.id !== blog.id));
		}
	};

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}{" "}
			<button onClick={toggleVisibility}>view</button>
			<Togglable visible={visible}>
				<p>{blog.url}</p>
				<p>
					likes: {blog.likes} <button onClick={updateLikes}>like</button>
				</p>
				<p>{blog.user.name}</p>
				<div style={showDelete}>
					<button onClick={deleteBlog}>remove</button>
				</div>
			</Togglable>
		</div>
	);
};

export default Blog;
