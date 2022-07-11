import ShowWeather from "./ShowWeather";

const Languages = ({ lang }) => {
	return <li>{lang}</li>;
};

const ShowCountry = ({ country, setNewFilter }) => {
	let size = country.length;

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
	} else if (size < 11) {
		return country.map((country) => (
			<p key={country.cca2}>
				{country.name.common}
				<button
					value={country.name.common}
					onClick={(e) => setNewFilter(e.target.value)}
				>
					show
				</button>
			</p>
		));
	}
	return "Too many matches, specify another filter";
};

export default ShowCountry;
