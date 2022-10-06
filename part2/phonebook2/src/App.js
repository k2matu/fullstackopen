import { useState, useEffect } from "react";
import personService from "./services/persons";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filteredNames, setFilteredNames] = useState("");
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		personService.getAll().then((response) => {
			setPersons(response.data);
		});
		setUpdate(false);
	}, [update]);

	const addPerson = (e) => {
		e.preventDefault();

		if (persons.some((e) => e.name === newName)) {
			if (window.confirm(`${newName} is already in the phonebook`)) {
				const foundPerson = persons.find((n) => n.name === newName);
				const changedPerson = { ...foundPerson, number: newNumber };

				personService.update(foundPerson.id, changedPerson).then((response) => {
					setPersons(
						persons.map((person) =>
							person.name !== e.name ? person : response
						)
					);
					setUpdate(true);
					setNewNumber("");
					setNewName("");
				});
			}
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			};
			personService.create(personObject).then((response) => {
				setPersons(persons.concat(response.data));
			});
			setNewName("");
			setNewNumber("");
		}
	};

	const personsToShow = persons.filter((person) =>
		person.name.toLowerCase().includes(filteredNames.toLowerCase())
	);

	const removePerson = (e) => {
		const found = persons.find((person) => person.name === e);
		if (window.confirm(`Delete ${e}?`)) {
			personService.remove(found.id);
			setPersons(persons.filter((person) => person.name !== e));
		}
	};

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
					<Person
						key={person.name}
						person={person}
						removePerson={removePerson}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
