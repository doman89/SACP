import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { WindowTopBarProps } from './interfaces/WindowTopBarProps';
import { default as WindowTopBarStyles} from './WindowTopBar.module.scss';
import { WindowTopButton } from '../WindowTopButton/WindowTopButton';
import { WindowLabel } from '../WindowLabel/WindowLabel';

const style = bemCssModules(WindowTopBarStyles);

export const WindowTopBar: React.FC<WindowTopBarProps> = ({isActive}) => (
	<div className={style()}>
		<WindowTopButton buttonIcon="is-close" isActive={isActive} />
		<WindowLabel isActive={isActive} title="Workbench" />
		<WindowTopButton buttonIcon="is-maximize" isActive={isActive} />
		<WindowTopButton buttonIcon="is-change-window" isActive={isActive} />
	</div>
);
