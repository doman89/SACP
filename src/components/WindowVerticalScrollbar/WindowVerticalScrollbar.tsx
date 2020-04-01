import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { default as WindowVerticalScrollbarStyles } from './WindowVerticalScrollbar.module.scss';
import { WindowVerticalScrollbarProps } from './interfaces/WindowVerticalScrollbarProps';

const style = bemCssModules(WindowVerticalScrollbarStyles);

export const WindowVerticalScrollbar: React.FC<WindowVerticalScrollbarProps> = ({ isActive }) => (
	<div className={style(null, { 'is-active': isActive })}>
		<span className={style('inner')} />
	</div>
);
