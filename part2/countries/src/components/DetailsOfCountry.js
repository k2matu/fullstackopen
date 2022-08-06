import React from "react";
import ShowWeather from "./ShowWeather";

const Languages = ({ lang }) => {
	return <li>{lang}</li>;
};

const DetailsOfCountry = ({ country }) => {
	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>capital: {country.capital}</p>
			<p>area: {country.area}</p>
			<h4>Languages:</h4>
			<ul>
				{Object.values(country.languages).map((lang) => (
					<Languages key={lang} lang={lang} />
				))}
			</ul>
			<img src={country.flags.png} alt={country.name.common} height="120px" />
			<h2>Weather in {country.capital}</h2>
			<ShowWeather city={country.capital} />
		</div>
	);
};

export default DetailsOfCountry;
