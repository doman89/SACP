import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { default as WindowRightEdgeStyles } from './WindowRightEdge.module.scss';
import { WindowRightEdgeProps } from './interfaces/WindowRightEdgeProps';
import { WindowButton } from '../WindowButton/WindowButton';
import { WindowVerticalScrollbar } from '../WindowVerticalScrollbar/WindowVerticalScrollbar';

const style = bemCssModules(WindowRightEdgeStyles);

export const WindowRightEdge: React.FC<WindowRightEdgeProps> = (props) => (
	<div className={style()}>
		<WindowVerticalScrollbar isActive={props.isActive} />
		<WindowButton buttonIcon='is-up' isActive={props.isActive} isVertical={true} onClick={props.scrollUp} />
		<WindowButton buttonIcon='is-down' isActive={props.isActive} isVertical={true} onClick={props.scrollDown} />
	</div>
);
