import PropTypes from "prop-types";

const Togglable = (props) => {
	const visibility = { display: props.visible ? "" : "none" };

	return (
		<div>
			<div style={visibility}>{props.children} </div>
		</div>
	);
};

Togglable.propTypes = {
	children: PropTypes.array.isRequired,
	visible: PropTypes.bool.isRequired,
};

export default Togglable;
