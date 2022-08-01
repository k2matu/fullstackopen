const blog = require("../models/blog");

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const total = blogs.reduce(function (sum, blog) {
		return sum + blog.likes;
	}, 0);
	return total;
};

const favoriteBlog = (blogs) => {
	const arrLikes = blogs.map((blog) => {
		return blog.likes;
	});

	const max = Math.max(...arrLikes);
	const index = arrLikes.indexOf(max);

	const { title, author, likes } = blogs[index];
	return { title: title, author: author, likes: likes };
};

const mostBlogs = (blogsWithMostAmount) => {
	const arrMostBlogs = blogsWithMostAmount.map((blog) => {
		return blog.blogs;
	});

	const max = Math.max(...arrMostBlogs);
	const index = arrMostBlogs.indexOf(max);

	const { author, blogs } = blogsWithMostAmount[index];
	return { author: author, blogs: blogs };
};

const mostLikes = (blogs) => {
	const arrLikes = blogs.map((blog) => {
		return blog.likes;
	});

	const max = Math.max(...arrLikes);
	const index = arrLikes.indexOf(max);

	const { author, likes } = blogs[index];
	return { author: author, likes: likes };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
