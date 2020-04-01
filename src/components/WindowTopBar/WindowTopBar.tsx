import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { WindowButton } from '../WindowButton/WindowButton';
import { WindowLabel } from '../WindowLabel/WindowLabel';
import { WindowTopBarProps } from './interfaces/WindowTopBarProps';
import { default as WindowTopBarStyles} from './WindowTopBar.module.scss';

const style = bemCssModules(WindowTopBarStyles);

export const WindowTopBar: React.FC<WindowTopBarProps> = (props) => (
	<div className={style()}>
		<WindowButton 
			buttonIcon="is-close"
			contentOf={props.contentOf}
			isActive={props.isActive}
			onClick={props.onClose}
		/>
		<WindowLabel
			handleOnMouseDown={props.handleOnMouseDown}
			isActive={props.isActive}
			title={props.contentOf}
		/>
		<WindowButton
			buttonIcon="is-maximize"
			isActive={props.isActive}
			onClick={props.minimizeWindow}
		/>
		<WindowButton
			buttonIcon="is-change-window"
			isActive={props.isActive}
			onClick={props.toggleUnderside}
		/>
	</div>
);
