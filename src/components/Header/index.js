import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

const Header = () => {
	let resizeTimer;
	window.addEventListener('resize', () => {
		document.body.classList.add('resize-active');
		if (window.innerWidth > 767) {
			setNavActive(false);
		}
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			document.body.classList.remove('resize-active');
		}, 400);
	});

	const [navActive, setNavActive] = useState(false);

	const handleNavClick = () => {
		if (navActive) {
			setNavActive(false);
		} else {
			setNavActive(true);
		}
	};

	const navMenuItems = [
		{ name: 'Current Conditions', to: '/', exact: true },
		{ name: 'Hourly report', to: '/hourly' },
		{ name: 'Daily Report', to: '/daily' },
	];

	return (
		<header id="header" className={navActive ? 'nav-active' : ''}>
			<div className="container">
				<nav id="nav" className="header--nav">
					<a href="http://www.binayabaral.com.np" target="_blank" rel="noopener noreferrer" className="logo">
						<img src={logo} alt="binayabaral.com.np" />
					</a>
					<Link to="#" className="nav-opener" onClick={handleNavClick}>
						<span></span>
					</Link>
					<ul className="navigation-menu">
						{navMenuItems.map(menuItem => (
							<li key={menuItem.to}>
								<NavLink to={menuItem.to} exact={menuItem.exact} onClick={handleNavClick}>
									{menuItem.name}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
