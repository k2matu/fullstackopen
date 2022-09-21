import { useState } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filteredNames, setFilteredNames] = useState("");

	const addPerson = (e) => {
		e.preventDefault();

		if (persons.some((e) => e.name === newName)) {
			window.alert(`${newName} is already in the phonebook`);
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			};

			setPersons(persons.concat(personObject));
			setNewName("");
			setNewNumber("");
		}
	};

	const personsToShow = persons.filter((person) =>
		person.name.toLowerCase().includes(filteredNames.toLowerCase())
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter setFilteredNames={setFilteredNames} />
			<h3>add a new</h3>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
			/>
			<h3>Numbers</h3>
			<div>
				{personsToShow.map((person) => (
					<Person key={person.name} person={person} />
				))}
			</div>
		</div>
	);
};

export default App;
