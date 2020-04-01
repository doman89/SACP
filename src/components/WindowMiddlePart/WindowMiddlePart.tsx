import React from 'react';
import { default as cssBemModules } from 'bem-css-modules';
import { WindowMiddlePartProps } from './interfaces/WindowMiddlePartProps';
import { default as WindowMiddlePartStyles } from './WindowMiddlePart.module.scss';
import { WindowLeftEdge } from '../WindowLeftEdge/WindowLeftEdge';
import { WindowRightEdge } from '../WindowRightEdge/WindowRightEdge';

const style = cssBemModules(WindowMiddlePartStyles);

export const WindowMiddlePart: React.FC<WindowMiddlePartProps> = ({content, isActive}) => (
	<div className={style()}>
		<WindowLeftEdge isActive={isActive} />
		<div className={style('content')}>
			{content}
		</div>
		<WindowRightEdge isActive={isActive} />
	</div>
);
