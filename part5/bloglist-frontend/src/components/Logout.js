import Blog from "./Blog";
import CreateBlog from "./CreateBlog";

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

	return (
		<div>
			<h2>blogs</h2>
			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>
			<div>
				<CreateBlog
					setSuccessMessage={setSuccessMessage}
					setErrorMessage={setErrorMessage}
					blogs={blogs}
					setBlogs={setBlogs}
				/>
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
