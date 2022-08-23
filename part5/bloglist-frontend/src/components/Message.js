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

export { Success, Fail };
