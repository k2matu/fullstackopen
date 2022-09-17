import PropTypes from "prop-types";
import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false);

	const showWhenVisible = { display: visible ? "" : "none" };
	const hideWhenVisible = { display: visible ? "none" : "" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility,
		};
	});

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible} className="togglableContent">
				<button onClick={toggleVisibility}>{props.buttonLabel2}</button>
				{props.children}{" "}
			</div>
		</div>
	);
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
	buttonLabel2: PropTypes.string.isRequired,
};

export default Togglable;
