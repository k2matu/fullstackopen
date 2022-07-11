import axios from "axios";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/persons";

const Success = ({ message }) => {
	console.log(message);
	if (message === null) {
		return null;
	}

	return <div className="success">{message}</div>;
};

const Fail = ({ message }) => {
	console.log(message);
	if (message === null) {
		return null;
	}

	return <div className="fail">{message}</div>;
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");
	const [newSuccessMessage, setNewSuccessMessage] = useState(null);
	const [newFailMessage, setNewFailMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialName) => {
			setPersons(initialName);
		});
	}, []);

	const addName = (event) => {
		event.preventDefault();
		const nameObject = {
			name: newName,
			number: newNumber,
		};

		if (persons.some((person) => person.name === nameObject.name)) {
			if (
				window.confirm(
					`${nameObject.name} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const person = persons.find(
					(person) => person.name === nameObject.name
				);
				const url = `http://localhost:3001/persons/${person.id}`;
				const changedNumber = { ...person, number: newNumber };

				axios.put(url, changedNumber).then((response) => {
					setPersons(
						persons.map((person) =>
							person.name !== nameObject.name ? person : response.data
						)
					);
					setNewName("");
					setNewNumber("");
					setNewSuccessMessage(`Replaced ${nameObject.name}'s number`);
					setTimeout(() => {
						setNewSuccessMessage(null);
					}, 5000);
				});
			}
		} else {
			personService.create(nameObject).then((returnedName) => {
				setPersons(persons.concat(returnedName));
				setNewName("");
				setNewNumber("");
				setNewSuccessMessage(`Added ${nameObject.name}`);
				setTimeout(() => {
					setNewSuccessMessage(null);
				}, 5000);
			});
		}
	};

	const personsToShow = newFilter
		? persons.filter((person) =>
				person.name.toLowerCase().startsWith(newFilter.toLowerCase())
		  )
		: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Success message={newSuccessMessage} />
			<Fail message={newFailMessage} />
			<Filter
				handleFilterChange={(event) => {
					setNewFilter(event.target.value);
				}}
			/>
			<h3>add a new</h3>
			<Form
				addName={addName}
				newName={newName}
				handleNameChange={(event) => {
					setNewName(event.target.value);
				}}
				newNumber={newNumber}
				handleNumberChange={(event) => {
					setNewNumber(event.target.value);
				}}
			/>
			<h2>Numbers</h2>
			<Persons
				setNewFailMessage={setNewFailMessage}
				personsToShow={personsToShow}
				setPersons={setPersons}
				persons={persons}
			/>
		</div>
	);
};

export default App;
