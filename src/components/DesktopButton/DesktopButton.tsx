import React from 'react';
import { default as bemCssModule } from 'bem-css-modules';
import { DesktopButtonProps } from './interfaces/DesktopButtonProps';
import { default as DesktopButtonStyles } from './DesktopButton.module.scss';
import { withWindowContext } from '../../contexts/WindowContext/withWindowContext';

const DESKTOP_BREAKPOINT = 768;
const style = bemCssModule(DesktopButtonStyles);

const DesktopButton: React.FC<DesktopButtonProps> = (props) => {
	const handleOnDoubleClick = (): void => {
		props.context.openWindow(props.iconTitle);
	};

	const handleOnClick = (): void => {
		if (window.innerWidth < DESKTOP_BREAKPOINT) {
			handleOnDoubleClick();
		} else {
			props.context.toggleIcon(props.iconTitle, true);
		}
	};

	const handleOnMouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		const element = event.currentTarget;

		props.context.handleOnMouseDown(event, element, false);
	};
	
	return (
		<button
			className={style({ 'is-active': props.context.activeIcon === props.iconTitle })}
			data-title={props.iconTitle}
			onClick={handleOnClick}
			onDoubleClick={handleOnDoubleClick}
			onMouseDown={handleOnMouseDown}
			onMouseUp={props.context.stopDragging}
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
				src={props.context.activeIcon === props.iconTitle ? props.iconImageActive : props.iconImage}
			/>
			<p className={style('title')}>
				{props.iconTitle}
			</p>
		</button>
	);
};

const DesktopButtonConsumer = withWindowContext(DesktopButton);

export { DesktopButtonConsumer as DesktopButton };
