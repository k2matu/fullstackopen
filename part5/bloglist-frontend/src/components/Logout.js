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
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default Logout;
