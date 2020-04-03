import React from 'react';
import { Window } from './../Window/Window';

interface AboutUsProps {
	contentOf: string;
	leftPosition: number;
	topPosition: number;
}

export const AboutUs: React.FC<AboutUsProps> = (props) => {
	return (
		<Window {...props}>
			<h2>O nas</h2>
			<p>Lorem ipsum dolor</p>
		</Window>
	)
}