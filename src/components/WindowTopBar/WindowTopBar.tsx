import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { WindowTopBarProps } from './interfaces/WindowTopBarProps';
import { default as WindowTopBarStyles} from './WindowTopBar.module.scss';
import { WindowButton } from '../WindowButton/WindowButton';
import { WindowLabel } from '../WindowLabel/WindowLabel';

const style = bemCssModules(WindowTopBarStyles);

export const WindowTopBar: React.FC<WindowTopBarProps> = ({isActive}) => (
	<div className={style()}>
		<WindowButton buttonIcon="is-close" isActive={isActive} />
		<WindowLabel isActive={isActive} title="Workbench" />
		<WindowButton buttonIcon="is-maximize" isActive={isActive} />
		<WindowButton buttonIcon="is-change-window" isActive={isActive} />
	</div>
);
