import axios from "axios";
import { useState } from "react";

function Persons({ personsToShow, setPersons, persons, setNewFailMessage }) {
	const [deleteName, setDeleteName] = useState(null);

	if (deleteName !== null) {
		let name = null;
		let size = personsToShow.length;

		for (let i = 0; i < size; i++) {
			if (personsToShow[i].id === Number(deleteName)) {
				name = personsToShow[i].name;
			}
		}

		if (name !== null && setDeleteName !== null) {
			if (window.confirm(`Delete ${name}?`)) {
				axios
					.delete(`http://localhost:3001/persons/${deleteName}`)
					.then(() => setDeleteName(null))
					.catch((error) => {
						setNewFailMessage(
							`Information of ${name} has already been removed from server`
						);
						setTimeout(() => {
							setNewFailMessage(null);
						}, 5000);
						setPersons(persons.filter((n) => n.id !== Number(deleteName)));
					});
			}
		}
	}

	return (
		<div>
			{personsToShow.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}{" "}
					<button
						value={person.id}
						onClick={(e) => setDeleteName(e.target.value)}
					>
						delete
					</button>
				</p>
			))}
		</div>
	);
}

export default Persons;
