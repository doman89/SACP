import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Desktop } from './components/Desktop/Desktop';
import { Header } from './components/Header/Header';
import { WindowContextProvider } from './contexts/WindowContext/WindowContext';
import { default as bemCssModules } from 'bem-css-modules';

import './App.css';

bemCssModules.setSettings({
	modifierDelimiter: '--',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	throwOnError: true,
});

export const App: React.FC = () => {

	return (
		<WindowContextProvider>
			<div className="app">
				<BrowserRouter >
					<Header />
					<div className="content">
						<Desktop />
					</div>
				</BrowserRouter>
			</div>
		</WindowContextProvider>
	);
};
