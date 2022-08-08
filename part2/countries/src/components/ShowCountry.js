import { useState } from "react";
import DetailsOfCountry from "./DetailsOfCountry";

const ShowCountry = ({ country }) => {
	const [oneCountry, setOneCountry] = useState([]);
	const [clicked, setClicked] = useState(true);

	const toggleButton = (e) => {
		const toggledCountry = country.find(
			(country) => country.name.common === e.target.value
		);

		const check = oneCountry.find(
			(country) => toggledCountry.name.common === country.name.common
		);

		const removeCountry = () => {
			setOneCountry((oneCountry) =>
				oneCountry.filter((country) => {
					return country.name.common !== toggledCountry.name.common;
				})
			);
		};

		if (clicked && !check) {
			setClicked(false);
			setOneCountry([...oneCountry, toggledCountry]);
		} else {
			setClicked(true);
			removeCountry();
		}
	};

	const infoCountry = () =>
		oneCountry.map((country) => (
			<div key={country.cca2}>
				<DetailsOfCountry country={country} />
			</div>
		));

	const manyCountries = () =>
		country.map((country, index) => (
			<div key={index}>
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
			{oneCountry.length > 0 && infoCountry()}
		</div>
	);
};

export default ShowCountry;
