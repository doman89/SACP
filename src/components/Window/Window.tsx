/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/jsx-handler-names */
import React, { useRef, useState } from 'react';
import { default as bemCssModule } from 'bem-css-modules';
import { WindowTopBar } from '../WindowTopBar/WindowTopBar';
import { WindowBottomBar } from '../WindowBottomBar/WindowBottomBar';
import { WindowMiddlePart } from '../WindowMiddlePart/WindowMiddlePart';
import { WindowProps } from './interfaces/WindowProps';
import { default as WindowStyle } from './Window.module.scss';
import { withWindowContext } from '../../contexts/WindowContext/withWindowContext';
import { ScrollDirection } from '../../contexts/WindowContext/WindowContext';

interface ElementDimension {
	width: number;
	height: number;
}

const style = bemCssModule(WindowStyle);

const Window: React.FC<WindowProps> = (props) => {
	const [isUnderside, setUnderside] = useState<boolean>(false);
	const windowRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const scrollDown = (): void => {
		const current = contentRef.current as HTMLDivElement;

		props.context.scrollIn(current, ScrollDirection.Down);
	};

	const scrollUp = (): void => {
		const current = contentRef.current as HTMLDivElement;

		props.context.scrollIn(current, ScrollDirection.Up);
	};

	const handleOnWheel = (event: React.WheelEvent): void =>
		event.deltaY > 0 ? scrollDown() : scrollUp();


	const scrollLeft = (): void => {
		const current = contentRef.current as HTMLDivElement;

		props.context.scrollIn(current, ScrollDirection.Left);
	};

	const scrollRight = (): void => {
		const current = contentRef.current as HTMLDivElement;

		props.context.scrollIn(current, ScrollDirection.Right);
	};

	const closeWindow = (): void => {
		props.context.closeWindow(props.contentOf);
	};

	const handleOnClick = (): void => {
		props.context.changeActiveWindow(props.contentOf);
	};

	const handleOnHoldMouseButton = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		props.context.handleOnMouseDown(event, windowRef.current as HTMLDivElement, true);
	};

	const handleResizeWindow = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		props.context.handleOnMouseDown(event, windowRef.current as HTMLElement, true, true);
	};

	const minimizeWindow = (): void => {
		const element = windowRef.current as HTMLDivElement;

		if (element.dataset.tempStyles === undefined) {
			const elementStyles: ElementDimension = {
				width: element.getBoundingClientRect().width,
				height: element.getBoundingClientRect().height,
			};

			element.dataset.tempStyles = JSON.stringify(elementStyles);
			element.style.width = '100px';
			element.style.height = '100px';
		} else {
			const elementStyles: ElementDimension = JSON.parse(element.dataset.tempStyles);

			delete element.dataset.tempStyles;
			element.style.width = `${elementStyles.width}px`;
			element.style.height = `${elementStyles.height}px`;
		}
	};

	const handleOnMouseMove = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		props.context.handleOnMouseMove(event, true);
	};

	const toggleUnderside = (): void => {
		setUnderside(!isUnderside);
		const [ , modifier ] = style({'is-underside': isUnderside}).split(' ');

		(windowRef.current as HTMLDivElement).classList.toggle(modifier);
	};

	if (!props.context.openedWindows.includes(props.contentOf)) {
		return null;
	}

	const {
		activeWindow,
		stopDragging,
	} = props.context;
	const isActive = props.contentOf === activeWindow;

	return (
		<div
			className={style({ 'is-active': isActive, 'is-underside': isUnderside })}
			data-title={props.contentOf}
			onClick={handleOnClick}
			onMouseMove={handleOnMouseMove}
			onMouseUp={stopDragging}
			ref={windowRef}
			style={{
				top: `${props.topPosition}px`, 
				left: `${props.leftPosition}px`
			}}
		>
			<WindowTopBar
				contentOf={props.contentOf}
				handleOnMouseDown={handleOnHoldMouseButton}
				isActive={isActive}
				minimizeWindow={minimizeWindow}
				onClose={closeWindow}
				toggleUnderside={toggleUnderside}
			/>
			<WindowMiddlePart
				content={props.children}
				contentReference={contentRef}
				isActive={isActive}
				scrollDown={scrollDown}
				scrollUp={scrollUp}
				wheelScroll={handleOnWheel}
			/>
			<WindowBottomBar
				handleResizeWindow={handleResizeWindow}
				isActive={isActive}
				scrollLeft={scrollLeft}
				scrollRight={scrollRight}
			/>
		</div>
	);
};

const WindowConsumer = withWindowContext(Window);

export { WindowConsumer as Window };
