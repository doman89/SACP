import React from 'react';
import { default as bemCssModule } from 'bem-css-modules';
import { default as WindowBottomBarStyles } from './WindowBottomBar.module.scss';
import { WindowButton } from '../WindowButton/WindowButton';
import { WindowHorizontalScrollbar } from '../WindowHorizontalScrollbar/WindowHorizontalScrollbar';
import { WindowBottomBarProps } from './interfaces/WindowBottomBarProps';

const style = bemCssModule(WindowBottomBarStyles);

export const WindowBottomBar: React.FC<WindowBottomBarProps> = ({ isActive }) => (
	<div className={style()}>
		<WindowHorizontalScrollbar isActive={isActive} />
		<WindowButton buttonIcon="is-left" isActive={isActive} isBottom={true} />
		<WindowButton buttonIcon="is-right" isActive={isActive} isBottom={true} />
		<WindowButton buttonIcon="is-resize" isActive={isActive} isResize={true} />
	</div>
);
