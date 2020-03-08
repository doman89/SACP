import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { default as HeaderStyles } from './Header.module.scss';

const style = bemCssModules(HeaderStyles);

export const Header: React.FC = () => (
	<header className={style()}>
		<p className={style('title')}>Workbench screen: </p>
		<h1 className={style('title', { 'is-main': true })}>
			Silesian Amiga Classic Party
		</h1>
	</header>
);