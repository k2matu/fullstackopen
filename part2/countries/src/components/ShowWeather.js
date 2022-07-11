import axios from "axios";
import { useEffect, useState } from "react";

const ShowWeather = ({ city }) => {
	const [weather, setWeather] = useState(null);
	const api_key = process.env.REACT_APP_API_KEY;

	useEffect(() => {
		axios
			.get(
				`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`
			)
			.then((response) => {
				setWeather(response.data);
			});
	}, [api_key, city]);

	if (weather !== null) {
		return (
			<div>
				<p>temperature: {weather.current.temp_c} Celcius</p>
				<img
					src={weather.current.condition.icon}
					alt={weather.current.condition.text}
					height="120px"
				></img>
				<p>wind: {weather.current.wind_kph} kph</p>
			</div>
		);
	}
};

export default ShowWeather;
