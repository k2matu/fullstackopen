import React from "react";

function Filter(props) {
	return (
		<div>
			filter shown with
			<input onChange={props.handleFilterChange} />
		</div>
	);
}

export default Filter;
