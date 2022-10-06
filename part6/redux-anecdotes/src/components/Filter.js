import { setFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
	// const dispatch = useDispatch();

	const style = {
		marginBottom: 10,
	};

	return (
		<div style={style}>
			filter <input onChange={(e) => props.setFilter(e.target.value)} />
		</div>
	);
};

export default connect(null, { setFilter })(Filter);
