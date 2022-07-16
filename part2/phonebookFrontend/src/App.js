import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import personService from "./services/persons";

const Success = ({ message }) => {
	if (!message) {
		return null;
	}

	return <div className="success">{message}</div>;
};

const Fail = ({ message }) => {
	if (!message) {
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
	const [deleteName, setDeleteName] = useState(null);

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
				const changedNumber = { ...person, number: newNumber };
				personService
					.update(person.id, changedNumber)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.name !== nameObject.name ? person : returnedPerson
							)
						);
						setNewName("");
						setNewNumber("");
						setNewSuccessMessage(`Replaced ${nameObject.name}'s number`);
						setTimeout(() => {
							setNewSuccessMessage(null);
						}, 5000);
					})
					.catch((error) => {
						setNewFailMessage(error.response.data.error);
						setTimeout(() => {
							setNewFailMessage(null);
						}, 5000);
					});
			}
		} else {
			personService
				.create(nameObject)
				.then((returnedName) => {
					setPersons(persons.concat(returnedName));
					setNewName("");
					setNewNumber("");
					setNewSuccessMessage(`Added ${nameObject.name}`);
					setTimeout(() => {
						setNewSuccessMessage(null);
					}, 5000);
				})
				.catch((error) => {
					setNewFailMessage(error.response.data.error);
					setTimeout(() => {
						setNewFailMessage(null);
					}, 5000);
				});
		}
	};

	const personsToShow = newFilter
		? persons.filter((person) =>
				person.name.toLowerCase().startsWith(newFilter.toLowerCase())
		  )
		: persons;

	if (deleteName) {
		const found = persons.find((person) => person.id === deleteName);

		if (window.confirm(`Delete ${found.name}?`)) {
			personService.erase(deleteName).then((persons) => setPersons(persons));
			setDeleteName(null);
		}
	}

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
		</div>
	);
};

export default App;
