import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { default as WindowHorizontalScrollbarStyles } from './WindowHorizontalScrollbar.module.scss';
import { WindowHorizontalScrollbarProps } from './interfaces/WindowHorizontalScrollbarProps';

const style = bemCssModules(WindowHorizontalScrollbarStyles);

export const WindowHorizontalScrollbar: React.FC<WindowHorizontalScrollbarProps> = ({ isActive }) => (
	<div className={style(null, { 'is-active': isActive })}>
		<span className={style('inner')} />
	</div>
);
