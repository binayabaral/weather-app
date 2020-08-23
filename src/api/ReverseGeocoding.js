import axios from 'axios';

// const apiKey = '125365f765d342499ccc386d2ba26433';
// const apiKey = '6d0e711d72d74daeb2b0bfd2a5cdfdba'; //testing
const apiKey = '6aa84f08bf7046ddbe86c59435e74199';

const getLocation = async location => {
	const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${location.lat}%2c${location.lng}&pretty=1`;

	try {
		const {
			data: { results },
		} = await axios.get(url);
		console.log('geo api called');
		return results[0].formatted;
	} catch (error) {
		console.log(error);
	}
};

export default getLocation;
