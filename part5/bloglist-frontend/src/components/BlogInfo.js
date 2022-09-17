const BlogInfo = ({ blog, updateLikes, showDelete, deleteBlog }) => {
	return (
		<div>
			{" "}
			<p>{blog.url}</p>
			<p>
				likes: {blog.likes} <button onClick={updateLikes}>like</button>
			</p>
			<p>user: {blog.user.name}</p>
			<div style={showDelete}>
				<button onClick={deleteBlog}>remove</button>
			</div>
		</div>
	);
};

export default BlogInfo;
