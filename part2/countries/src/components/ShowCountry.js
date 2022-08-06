import ShowWeather from "./ShowWeather";
import { useState } from "react";

const Languages = ({ lang }) => {
	return <li>{lang}</li>;
};

const ShowCountry = ({ country, setNewFilter }) => {
	const [oneCountry, setOneCountry] = useState(null);
	let size = country.length;

	const toggleActive = (e) => {
		const found = country.find(
			(country) => country.name.common === e.target.value
		);
		setOneCountry(found);
	};

	const checkOne = () => (
		<div>
			<h1>{oneCountry.name.common}</h1>
			<p>capital: {oneCountry.capital}</p>
			<p>area: {oneCountry.area}</p>
			<h4>Languages:</h4>
			<ul>
				{Object.values(oneCountry.languages).map((lang) => (
					<Languages key={lang} lang={lang} />
				))}
			</ul>
			<img
				src={oneCountry.flags.png}
				alt={oneCountry.name.common}
				height="120px"
			/>
			<h2>Weather in {oneCountry.capital}</h2>
			<ShowWeather city={oneCountry.capital} />
		</div>
	);

	const manySize = () =>
		country.map((country) => (
			<div key={country.cca2}>
				{country.name.common}
				{(country.active = false)}
				<button value={country.name.common} onClick={toggleActive}>
					show
				</button>
			</div>
		));

	const tooMany = () => "Too many matches, specify another filter";

	if (size === 1) {
		return (
			<div>
				<h1>{country[0].name.common}</h1>
				<p>capital: {country[0].capital}</p>
				<p>area: {country[0].area}</p>
				<h4>Languages:</h4>
				<ul>
					{Object.values(country[0].languages).map((lang) => (
						<Languages key={lang} lang={lang} />
					))}
				</ul>
				<img
					src={country[0].flags.png}
					alt={country[0].name.common}
					height="120px"
				/>
				<h2>Weather in {country[0].capital}</h2>
				<ShowWeather city={country[0].capital} />
			</div>
		);
	} else
		return (
			<div>
				{size > 10 && tooMany()}
				{size < 11 && manySize()}
				{oneCountry && checkOne()}
			</div>
		);
};

export default ShowCountry;
