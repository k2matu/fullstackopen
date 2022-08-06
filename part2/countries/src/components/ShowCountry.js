import { useState } from "react";
import DetailsOfCountry from "./DetailsOfCountry";

const ShowCountry = ({ country }) => {
	const [oneCountry, setOneCountry] = useState(null);

	const toggleActive = (e) => {
		const toggledCountry = country.find(
			(country) => country.name.common === e.target.value
		);
		setOneCountry(toggledCountry);
	};

	console.log(oneCountry);

	const infoCountry = () => {
		return <DetailsOfCountry country={oneCountry} />;
	};

	const manyCountries = () =>
		country.map((country) => (
			<div key={country.cca2}>
				{country.name.common}
				{(country.active = false)}
				<button value={country.name.common} onClick={toggleActive}>
					show
				</button>
			</div>
		));

	if (country.length === 1) {
		return <DetailsOfCountry country={country[0]} />;
	} else {
		return (
			<div>
				{country.length > 10 && "Too many matches, specify another filter"}
				{country.length < 11 && manyCountries()}
				{oneCountry && infoCountry()}
			</div>
		);
	}
};

export default ShowCountry;
