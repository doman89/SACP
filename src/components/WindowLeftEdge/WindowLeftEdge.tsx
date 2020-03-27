import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { default as WindowLeftEdgeStyles } from './WindowLeftEdge.module.scss';
import { WindowLeftEdgeProps } from './interfaces/WindowLeftEdgeProps';

const style = bemCssModules(WindowLeftEdgeStyles);

export const WindowLeftEdge: React.FC<WindowLeftEdgeProps> = ({ isActive }) => (
	<div className={style({ 'is-active': isActive })} />
);
