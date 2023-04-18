import './about.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {
	return (
		<div className="about">
			<h2>THE VINTAGE CLOTHING</h2>
			<p>
				The vintage clothing is a small scale clothing store which is owned by
				Mr. Imesh Dassanayake. They're in the market since 2020.
			</p>
		</div>
	);
};

export default About;
