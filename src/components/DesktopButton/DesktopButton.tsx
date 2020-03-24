import React, { useState } from 'react';
import { default as bemCssModule } from 'bem-css-modules';
import { DesktopButtonProps } from './interfaces/DesktopButtonProps';
import { default as DesktopButtonStyles } from './DesktopButton.module.scss';

const DESKTOP_BREAKPOINT = 768;
const style = bemCssModule(DesktopButtonStyles);

export const DesktopButton: React.FC<DesktopButtonProps> = (props) => {
	const [ isActive, toggleActive ] = useState<boolean>(false);
	const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		if (window.innerWidth < DESKTOP_BREAKPOINT) {
			props.handleOnClick(event);
		} else {
			toggleActive(true);
		}
	};

	const handleOnDoubleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		props.handleOnClick(event);
	};

	const handleOnBlur = (): void => {
		toggleActive(false);
	};

	const handleOnMouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		toggleActive(true);
		props.handleOnMouseDown(event);
	};

	return (
		<button
			className={style({ 'is-active': isActive })}
			onBlur={handleOnBlur}
			onClick={handleOnClick}
			onDoubleClick={handleOnDoubleClick}
			onMouseDown={handleOnMouseDown}
			onMouseUp={props.handleOnMouseUp}
			style={{
				top: `${props.topPosition}px`, 
				left: `${props.leftPosition}px`
			}}
			type="button"
		>
			<img
				className={style('icon')}
				data-title={props.iconTitle}
				draggable="false"
				src={isActive ? props.iconImageActive : props.iconImage}
			/>
			<p className={style('title')}>
				{props.iconTitle}
			</p>
		</button>
	);
};
