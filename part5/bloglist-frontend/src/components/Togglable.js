import PropTypes from "prop-types";

const Togglable = (props) => {
	const visibility = { display: props.visible ? "" : "none" };

	return (
		<div style={visibility} className="togglableContent">
			{props.children}{" "}
		</div>
	);
};

Togglable.propTypes = {
	children: PropTypes.array.isRequired,
	visible: PropTypes.bool.isRequired,
};

export default Togglable;
