const Success = ({ successMessage }) => {
	if (successMessage) {
		return <div className="success">{successMessage}</div>;
	}
};

const Fail = ({ errorMessage }) => {
	if (errorMessage) {
		return <div className="fail">{errorMessage}</div>;
	}
};

export { Success, Fail };
