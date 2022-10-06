import { useSelector, useDispatch } from "react-redux";
import { voteAnecdotes } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdote);
	const filter = useSelector((state) => state.filter.filter);
	const dispatch = useDispatch();

	const filteredAnecdotes = anecdotes.filter((elem) =>
		elem.content.toLowerCase().includes(filter.toLowerCase())
	);

	const handleClick = (e) => {
		const found = anecdotes.find((element) => element.id === e.target.value);
		dispatch(voteAnecdotes(e.target.value));
		dispatch(showNotification(`you voted "${found.content}"`, 10));
	};
	return (
		<div>
			{filteredAnecdotes
				.slice()
				.sort((a, b) => a.votes - b.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button value={anecdote.id} onClick={(e) => handleClick(e)}>
								vote
							</button>
						</div>
					</div>
				))}
		</div>
	);
};

export default AnecdoteList;
