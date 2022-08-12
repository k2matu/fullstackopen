import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import blogService from "./services/blogs";

const Success = ({ successMessage }) => {
	if (successMessage) {
		return <div className="success">{successMessage}</div>;
	}
};

const Fail = ({ failMessage }) => {
	if (failMessage) {
		return <div className="fail">{failMessage}</div>;
	}
};

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
		return <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />;
	}

	return (
		<div>
			<Success successMessage={successMessage} />
			<Fail failMessage={errorMessage} />
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
