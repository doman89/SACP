import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { WindowLabelProps } from './interfaces/WindowLabelProps';
import { default as WindowLabelStyles } from './WindowLabel.module.scss';

const style = bemCssModules(WindowLabelStyles);

export const WindowLabel: React.FC<WindowLabelProps> = ({isActive, title, handleOnMouseDown, handleOnMouseUp}) => (
	<div
		className={style({ 'is-active': isActive })}
		onMouseDown={handleOnMouseDown}
		onMouseUp={handleOnMouseUp}
	>
		<p className={style('title')}>
			{title}
		</p>
	</div>
);
