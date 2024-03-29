import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import { Success } from "./components/Message";
import blogService from "./services/blogs";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	if (user === null) {
		return (
			<LoginForm
				setUser={setUser}
				errorMessage={errorMessage}
				setErrorMessage={setErrorMessage}
			/>
		);
	}

	return (
		<div>
			<Success successMessage={successMessage} />
			<Logout
				blogs={blogs}
				setBlogs={setBlogs}
				user={user}
				setUser={setUser}
				setErrorMessage={setErrorMessage}
				setSuccessMessage={setSuccessMessage}
			/>
		</div>
	);
};

export default App;
