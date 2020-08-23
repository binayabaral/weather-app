import axios from 'axios';

// const apiKey = '125365f765d342499ccc386d2ba26433';
// const apiKey = '6d0e711d72d74daeb2b0bfd2a5cdfdba'; //testing
const apiKey = '6aa84f08bf7046ddbe86c59435e74199';

const getCoordinates = async location => {
	const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${location.city.replace(/\s/g, '%20')}%2c%20${location.country.replace(/\s/g, '%20')}&pretty=1&language=en`;

	try {
		const {
			data: { results },
		} = await axios.get(url);
		console.log('geo api called');
		return results;
	} catch (error) {
		console.log(error);
	}
};

export default getCoordinates;
