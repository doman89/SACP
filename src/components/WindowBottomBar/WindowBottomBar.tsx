import React from 'react';
import { default as bemCssModule } from 'bem-css-modules';
import { default as WindowBottomBarStyles } from './WindowBottomBar.module.scss';
import { WindowButton } from '../WindowButton/WindowButton';
import { WindowHorizontalScrollbar } from '../WindowHorizontalScrollbar/WindowHorizontalScrollbar';
import { WindowBottomBarProps } from './interfaces/WindowBottomBarProps';

const style = bemCssModule(WindowBottomBarStyles);

export const WindowBottomBar: React.FC<WindowBottomBarProps> = (props) => (
	<div className={style()}>
		<WindowHorizontalScrollbar isActive={props.isActive} />
		<WindowButton
			buttonIcon="is-left"
			isActive={props.isActive}
			isBottom={true}
			onClick={props.scrollLeft}
		/>
		<WindowButton
			buttonIcon="is-right"
			isActive={props.isActive}
			isBottom={true}
			onClick={props.scrollRight}
		/>
		<WindowButton
			buttonIcon="is-resize"
			isActive={props.isActive}
			isResize={true}
			onMouseDown={props.handleResizeWindow}
		/>
	</div>
);
