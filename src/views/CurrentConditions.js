import React, { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';

const CurrentConditions = () => {
	const contextData = useContext(WeatherContext);
	const currentData = contextData.currentWeather;
	const currentTime = new Date(currentData.dt * 1000);
	const sunset = new Date(currentData.sunset * 1000);
	const sunrise = new Date(currentData.sunrise * 1000);
	const imgSrc = currentData.weather ? `http://openweathermap.org/img/wn/${currentData.weather[0].icon}.png` : '';

	return (
		<section className="current-condition">
			<div className="container">
				{currentData.dt && contextData.coords.lat !== 'Invalid Input' ? (
					<div>
						<h1>Current Conditions</h1>
						<div className="weather">
							<div className="icon-and-temp">
								<div className="img">
									<img src={imgSrc} alt="weather-icon" />
								</div>
								<span className="temperature">
									{Math.floor(currentData.temp - 273.15)} °C / {Math.floor(((currentData.temp - 273.15) * 9) / 5 + 32)} °F
								</span>
							</div>
							<span className="weather--description">{currentData.weather[0].description}</span>
						</div>
						<span className="time">Current Time: {currentTime.toString()}</span>
						<span className="sunrise-time">
							Sunrise Today: {sunrise.getHours()}:{sunrise.getMinutes()}:{sunrise.getSeconds()} AM
						</span>
						<span className="sunset-time">
							Sunrset Today: {sunset.getHours()}:{sunset.getMinutes()}:{sunset.getSeconds()} PM
						</span>
						<span className="feels-like">
							Feels Like: {Math.floor(currentData.feels_like - 273.15)} °C / {Math.floor(((currentData.feels_like - 273.15) * 9) / 5 + 32)} °F
						</span>
						<span className="pressure">Pressure: {currentData.pressure / 1000} bar</span>
						<span className="humidity">Humidity: {currentData.humidity} %</span>
						<span className="uvi">UV Index at Midday: {currentData.uvi}</span>
						<span className="clouds">Clouds: {currentData.clouds} %</span>
						<span className="wind-speed">Wind Speed: {currentData.wind_speed} m/s</span>
						<span className="wind-deg">Wind Degrees: {currentData.wind_deg} m/s</span>
					</div>
				) : (
					''
				)}
			</div>
		</section>
	);
};

export default CurrentConditions;
