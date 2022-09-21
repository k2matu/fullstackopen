const Filter = ({ setFilteredNames }) => {
	return (
		<div>
			filter shown with
			<input type="text" onChange={(e) => setFilteredNames(e.target.value)} />
		</div>
	);
};

export default Filter;
