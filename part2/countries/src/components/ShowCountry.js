import { useState } from "react";
import DetailsOfCountry from "./DetailsOfCountry";

const ShowCountry = ({ country }) => {
	const [oneCountry, setOneCountry] = useState(null);
	const [clicked, setClick] = useState(true);

	function toggleButton(e) {
		if (clicked) {
			const toggledCountry = country.find(
				(country) => country.name.common === e.target.value
			);
			setOneCountry(toggledCountry);
			setClick(false);
		} else {
			setOneCountry(null);
			setClick(true);
		}
	}

	const infoCountry = () => {
		return <DetailsOfCountry country={oneCountry} />;
	};

	const manyCountries = () =>
		country.map((country) => (
			<div key={country.cca2}>
				{country.name.common}
				<button value={country.name.common} onClick={toggleButton}>
					show
				</button>
			</div>
		));

	if (country.length === 1) {
		return <DetailsOfCountry country={country[0]} />;
	}
	return (
		<div>
			{country.length > 10 && "Too many matches, specify another filter"}
			{country.length < 11 && manyCountries()}
			{oneCountry && infoCountry()}
		</div>
	);
};

export default ShowCountry;
