import { connect } from "react-redux";

const Notification = (props) => {
	// const notification = useSelector((state) => state.notification.notis);
	// const visible = useSelector((state) => state.notification.visible);

	const hideWhenVisible = { display: props.visible ? "" : "none" };

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
	};

	return (
		<div style={hideWhenVisible}>
			<div style={style}>{props.notification}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		notification: state.notification.notis,
		visible: state.notification.visible,
	};
};

const ConnectedNotifications = connect(mapStateToProps)(Notification);
export default ConnectedNotifications;
