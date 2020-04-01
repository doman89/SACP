import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { default as WindowRightEdgeStyles } from './WindowRightEdge.module.scss';
import { WindowRightEdgeProps } from './interfaces/WindowRightEdgeProps';
import { WindowButton } from '../WindowButton/WindowButton';
import { WindowVerticalScrollbar } from '../WindowVerticalScrollbar/WindowVerticalScrollbar';

const style = bemCssModules(WindowRightEdgeStyles);

export const WindowRightEdge: React.FC<WindowRightEdgeProps> = ({ isActive }) => (
	<div className={style()}>
		<WindowVerticalScrollbar isActive={isActive} />
		<WindowButton buttonIcon='is-up' isActive={isActive} isVertical={true} />
		<WindowButton buttonIcon='is-down' isActive={isActive} isVertical={true} />
	</div>
);
