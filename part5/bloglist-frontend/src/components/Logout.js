import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import blogService from "../services/blogs";
import { useRef } from "react";
import Togglable from "./Togglable";

const Logout = ({
	setUser,
	user,
	setBlogs,
	blogs,
	setSuccessMessage,
	setErrorMessage,
}) => {
	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem("loggedBlogAppUser");
	};

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility();
		blogService.create(blogObject).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog));
		});
	};

	const blogFormRef = useRef();

	return (
		<div>
			<h2>blogs</h2>
			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>
			<div>
				<Togglable
					buttonLabel="new blog"
					buttonLabel2="cancel"
					ref={blogFormRef}
				>
					<CreateBlog
						createBlog={addBlog}
						setErrorMessage={setErrorMessage}
						setSuccessMessage={setSuccessMessage}
					/>
				</Togglable>
			</div>
			{blogs
				.sort((a, b) => a.likes - b.likes)
				.map((blog) => (
					<Blog
						key={blog.id}
						blogs={blogs}
						setBlogs={setBlogs}
						blog={blog}
						user={user}
					/>
				))}
		</div>
	);
};

export default Logout;
