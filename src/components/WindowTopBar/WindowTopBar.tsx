import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { WindowButton } from '../WindowButton/WindowButton';
import { WindowLabel } from '../WindowLabel/WindowLabel';
import { WindowTopBarProps } from './interfaces/WindowTopBarProps';
import { default as WindowTopBarStyles} from './WindowTopBar.module.scss';

const style = bemCssModules(WindowTopBarStyles);

export const WindowTopBar: React.FC<WindowTopBarProps> = ({isActive, onClose, contentOf, handleOnMouseDown, handleOnMouseUp}) => (
	<div className={style()}>
		<WindowButton 
			buttonIcon="is-close"
			contentOf={contentOf}
			isActive={isActive}
			onClick={onClose}
		/>
		<WindowLabel
			handleOnMouseDown={handleOnMouseDown}
			handleOnMouseUp={handleOnMouseUp}
			isActive={isActive}
			title={contentOf}
		/>
		<WindowButton
			buttonIcon="is-maximize"
			isActive={isActive}
		/>
		<WindowButton
			buttonIcon="is-change-window"
			isActive={isActive}
		/>
	</div>
);
