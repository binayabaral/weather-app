import axios from 'axios';

const apiKey = 'a1db5dc5dcbf42c3a02d6087ae5f31cb';

const getWeather = async coords => {
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=${apiKey}`;

	try {
		const { data } = await axios.get(url);
		console.log('weather api called');
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default getWeather;
