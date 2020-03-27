import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { WindowButtonProps } from './interfaces/WindowButtonProps';
import { default as WindowButtonStyles } from './WindowButton.module.scss';

const style = bemCssModules(WindowButtonStyles);

export const WindowButton: React.FC<WindowButtonProps> = (props) => (
	<button
		className={style(null, {
			[props.buttonIcon]: Boolean(props.buttonIcon),
			'is-active': props.isActive,
			'is-bottom': props.isBottom,
			'is-resize': props.isResize,
			'is-vertical': props.isVertical,
		})}
		data-title={props.contentOf}
		onClick={props.onClick}
		type="button"
	/>
);
