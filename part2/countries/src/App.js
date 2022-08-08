import { useState, useEffect } from "react";
import axios from "axios";
import ShowCountry from "./components/ShowCountry";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [newFilter, setNewFilter] = useState("");

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response.data);
		});
	}, []);

	const country = countries.filter((country) =>
		country.name.common.toLowerCase().includes(newFilter.toLowerCase())
	);

	const handleOnChange = (event) => {
		setNewFilter(event.target.value);
	};

	return (
		<div>
			<p>
				find countries
				<input onChange={handleOnChange} />
			</p>
			<ShowCountry country={country} setNewFilter={setNewFilter} />
		</div>
	);
};

export default App;
