import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';

import Header from './components/Header';
import LocationSelector from './components/LocationSelector';

import WeatherProvider from './contexts/WeatherContext';

function App() {
	return (
		<WeatherProvider>
			<Router>
				<Header />
				<LocationSelector />
				<Routes />
			</Router>
		</WeatherProvider>
	);
}

export default App;
