import React, { createContext, useState, useEffect } from 'react';

import getWeather from '../api/Weather';

export const WeatherContext = createContext();

const WeatherProvider = props => {
	const [coords, setCoords] = useState({});
	const [currentWeather, setCurrentWeather] = useState({});
	const [hourlyWeather, setHourlyWeather] = useState({});
	const [dailyWeather, setDailyWeather] = useState({});

	useEffect(() => {
		const fetchWeather = async () => {
			const data = await getWeather(coords);
			setCurrentWeather(data.current);
			setHourlyWeather(data.hourly);
			setDailyWeather(data.daily);
		};
		if (coords.lat && coords.lat !== 'Invalid Input') {
			fetchWeather();
		}
	}, [coords]);

	return <WeatherContext.Provider value={{ coords, setCoords, currentWeather, hourlyWeather, dailyWeather }}>{props.children}</WeatherContext.Provider>;
};

export default WeatherProvider;
