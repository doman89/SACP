import React, { useState } from 'react';
import { default as bemCssModule } from 'bem-css-modules';
import { DesktopButtonProps } from './interfaces/DesktopButtonProps';
import { default as DesktopButtonStyles } from './DesktopButton.module.scss';

const DESKTOP_BREAKPOINT = 768;
const style = bemCssModule(DesktopButtonStyles);

export const DesktopButton: React.FC<DesktopButtonProps> = (props) => {
	const [ isActive, toggleActive ] = useState<boolean>(false);
	const handleOnClick = (): void => {
		if (window.innerWidth < DESKTOP_BREAKPOINT) {
			props.handleOnClick();
		} else {
			toggleActive(true);
		}
	};

	const handleOnDoubleClick = (): void => {
		props.handleOnClick();
	};

	const handleOnBlur = (): void => {
		toggleActive(false);
	};

	return (
		<button
			className={style({ 'is-active': isActive })}
			onBlur={handleOnBlur}
			onClick={handleOnClick}
			onDoubleClick={handleOnDoubleClick}
			onMouseDown={props.handleOnMouseDown}
			onMouseUp={props.handleOnMouseUp}
			style={{
				top: `${props.topPosition}px`, 
				left: `${props.leftPosition}px`
			}}
			type="button"
		>
			<img
				className={style('icon')}
				draggable="false"
				src={props.iconImage}
			/>
			<p className={style('title')}>
				{props.iconTitle}
			</p>
		</button>
	);
};
