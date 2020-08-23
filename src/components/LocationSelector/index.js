import React, { useState, useEffect, useContext } from 'react';
import getLocation from '../../api/ReverseGeocoding';
import getCoordinates from '../../api/Geocoding';

import { WeatherContext } from '../../contexts/WeatherContext';

const LocationSelector = () => {
	const [coords, setCoords] = useState({});
	const [formattedLocation, setFormattedLocation] = useState('Getting Co-ordinates from Browser');
	const [requiredLocation, setRequiredLocation] = useState({});
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [formIsValid, setFormIsValid] = useState(true);

	const contextData = useContext(WeatherContext);

	const handleCityChange = e => {
		e.preventDefault();
		setCity(e.target.value);
	};

	const handleCountryChange = e => {
		e.preventDefault();
		setCountry(e.target.value);
	};

	const getCoordsFromBrowser = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(setPosition, showError);
		} else {
			setFormattedLocation('Geolocation is not supported by your browser.');
		}
	};

	const showError = error => {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				setFormattedLocation('Enable Location Access to continue.');
				break;
			case error.POSITION_UNAVAILABLE:
				setFormattedLocation('Location information is unavailable.');
				break;
			case error.TIMEOUT:
				setFormattedLocation('The request to get user location timed out.');
				break;
			default:
				setFormattedLocation('An unknown error occurred.');
				break;
		}
	};

	const setPosition = position => {
		const currentLocationFromBrowser = {
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		};
		setCoords(currentLocationFromBrowser);
		contextData.setCoords(currentLocationFromBrowser);
	};

	useEffect(() => {
		const getData = async () => {
			try {
				if (coords.lat && !requiredLocation.formatted) {
					setFormattedLocation('Getting Location ...');
					const data = await getLocation(coords);
					if (data) {
						setFormattedLocation(data);
					} else {
						setFormattedLocation('Error Detecting Location!');
					}
				} else if (!coords.lat) {
					getCoordsFromBrowser();
				} else {
					setFormattedLocation(requiredLocation.formatted);
					setCoords(requiredLocation.geometry);
					contextData.setCoords(requiredLocation.geometry);
				}
			} catch (error) {
				setRequiredLocation({
					geometry: {
						lat: 'Invalid Input',
						lng: 'Invalid Input',
					},
					formatted: 'Enter a Valid Location',
				});
			}
		};

		getData();
		// eslint-disable-next-line
	}, [coords, requiredLocation]);

	const submitSearch = async e => {
		e.preventDefault();
		if (!city || !country) {
			setFormIsValid(false);
		} else {
			setFormattedLocation('Getting Location ...');
			const data = await getCoordinates({ city, country });

			if (data[0]) {
				setRequiredLocation(data[0]);
			} else {
				setRequiredLocation({
					geometry: {
						lat: 'Invalid Input',
						lng: 'Invalid Input',
					},
					formatted: 'Enter a Valid Location',
				});
			}

			data.forEach(element => {
				if (element.confidence > requiredLocation.confidence) {
					setRequiredLocation(element);
				}
			});
			if (requiredLocation.geometry) {
				setCoords(requiredLocation.geometry);
				contextData.setCoords(requiredLocation.geometry);
			}
			if (requiredLocation.formatted) {
				setFormattedLocation(requiredLocation.formatted);
			}

			setCity('');
			setCountry('');
		}
	};

	const resetForm = () => {
		setFormIsValid(true);
	};

	return (
		<section className="location-selector">
			<div className="container">
				<form onSubmit={submitSearch}>
					<div className="form-inputs">
						<div className="input-grp">
							<label htmlFor="city">City:</label>
							<input type="text" id="city" value={city} onChange={handleCityChange} onFocus={resetForm} />
						</div>
						<div className="input-grp">
							<label htmlFor="country">Country:</label>
							<input type="text" id="country" value={country} onChange={handleCountryChange} onFocus={resetForm} />
						</div>
						<button type="submit">Search</button>
					</div>
					<p className={formIsValid ? '' : 'show'}>Enter both city and country</p>
				</form>
				<span className="weather-for">Showing weather information for:</span>
				<h3>{requiredLocation.formatted ? requiredLocation.formatted : formattedLocation}</h3>
				<div className="coords">
					<span>latitude: {coords.lat ? coords.lat : formattedLocation}</span>
					<span>longitude: {coords.lng ? coords.lng : formattedLocation}</span>
				</div>
			</div>
		</section>
	);
};

export default LocationSelector;
