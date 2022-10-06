import React from "react";

const Person = ({ person, removePerson }) => {
	return (
		<div>
			{person.name} {person.number}{" "}
			<button value={person.name} onClick={(e) => removePerson(e.target.value)}>
				delete
			</button>
		</div>
	);
};

export default Person;
