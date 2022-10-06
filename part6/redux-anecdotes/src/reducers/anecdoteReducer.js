import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// const getId = () => (100000 * Math.random()).toFixed(0);
const initialState = [];

const anecdoteSlice = createSlice({
	name: "anecdote",
	initialState,
	reducers: {
		increment(state, action) {
			const changedVote = action.payload;
			return state.map((anecdote) =>
				anecdote.id !== changedVote.id ? anecdote : changedVote
			);
		},
		appendAnecdote(state, action) {
			state.push(action.payload);
		},
		setAnecdote(state, action) {
			return action.payload;
		},
	},
});

export const { increment, appendAnecdote, setAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdote(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdotes = await anecdoteService.createNew(content);
		dispatch(appendAnecdote(newAnecdotes));
	};
};

export const voteAnecdotes = (id) => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		const anecdotesToChange = anecdotes.find((n) => n.id === id);
		const changedVote = {
			...anecdotesToChange,
			votes: anecdotesToChange.votes + 1,
		};
		const updatedAnecdote = await anecdoteService.update(id, changedVote);
		dispatch(increment(updatedAnecdote));
	};
};

export default anecdoteSlice.reducer;
