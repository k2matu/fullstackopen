// import { useState } from "react";
// const [filter, setFilter] = useState("");

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	filter: "",
};

export const filterSlice = createSlice({
	name: "productFilter",
	initialState, // useState("")
	reducers: {
		setFilter: /* setFilter */ (state, action) => {
			state.filter = action.payload;
		},
		clearFilter: (state) => {
			state.filter = "";
		},
	},
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;

// import React from "react";

// export const Filter = ({ filter, setFilter }) => {
// 	return (
// 		<div>
// 			<input value={filter} onChange={(e) => setFilter(e.target.value)}></input>
// 		</div>
// 	)
// };

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/slices/filterSlice";

export const Filter = () => {
	const filter = useSelector((state) => state.productFilter.filter); // filter
	const dispatch = useDispatch();

	return (
		<div>
			<input
				value={filter}
				onChange={(e) => dispatch(setFilter(e.target.value))} // setFilter
			></input>
		</div>
	);
};
