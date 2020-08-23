import React from 'react';
import { Switch, Route } from 'react-router';

import CurrentConditions from './views/CurrentConditions';
import HourlyReport from './views/HourlyReport';
import DailyReport from './views/DailyReport';

const Routes = () => {
	return (
		<Switch>
			<Route path="/" exact component={CurrentConditions} />
			<Route path="/hourly" component={HourlyReport} />
			<Route path="/daily" component={DailyReport} />
		</Switch>
	);
};

export default Routes;
