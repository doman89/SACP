import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { WindowButtonProps } from './interfaces/WindowTopButtonProps';
import { default as WindowTopButtonStyles } from './WindowTopButton.module.scss';

const style = bemCssModules(WindowTopButtonStyles);

export const WindowTopButton: React.FC<WindowButtonProps> = (props) => (
	<button
		className={style(null, {
			[props.buttonIcon]: Boolean(props.buttonIcon),
			'is-active': props.isActive,
		})}
		type="button"
	/>
);
