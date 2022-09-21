import Togglable from "./Togglable";
import blogService from "../services/blogs";
import BlogInfo from "./BlogInfo";

const Blog = ({ blog, blogs, setBlogs, user, setSuccessMessage }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
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
		blogService.update(blog.id, changedLikes).then((response) => {
			setBlogs(
				blogs.map((elem) =>
					elem.title !== changedLikes.title
						? elem
						: { ...elem, likes: response.likes }
				)
			);
		});
	};

	const deleteBlog = async () => {
		if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
			await blogService.remove(blog.id);
			setSuccessMessage(
				`${blog.title} by ${blog.author} has been removed successfully`
			);
			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
			setBlogs(blogs.filter((elem) => elem.id !== blog.id));
		}
	};

	return (
		<div style={blogStyle} className="blog">
			<div>
				{blog.title} {blog.author}
			</div>
			<Togglable buttonLabel="view" buttonLabel2="hide">
				<BlogInfo
					blog={blog}
					updateLikes={updateLikes}
					showDelete={showDelete}
					deleteBlog={deleteBlog}
				/>
			</Togglable>
		</div>
	);
};

export default Blog;
