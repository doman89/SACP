import React, { useRef } from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { AboutUs } from '../AboutUs/AboutUs';
import { DesktopButton } from '../DesktopButton/DesktopButton';
import { Window } from './../Window/Window';
import { withWindowContext } from '../../contexts/WindowContext/withWindowContext';
import { WithWindowContext } from '../../contexts/WindowContext/interfaces/WithWindowContext';
import { desktopIcons } from './helpers/desktopIcons';
import { IconNames } from './helpers/iconNames';
import { default as DesktopStyles } from './Desktop.module.scss';

const style = bemCssModules(DesktopStyles);

const Desktop: React.FC<WithWindowContext> = ({context}) => {
	const desktopRef = useRef(null);
	const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		if (event.target === desktopRef.current) {
			context.toggleIcon('', true, true);
		}
	};

	return (
		<div
			className={style()}
			onClick={handleOnClick}
			onMouseMove={context.handleOnMouseMove}
			onMouseUp={context.stopDragging}
			ref={desktopRef}
		>
			{desktopIcons.map(({icon, iconActive, left, title, top}) => (
				<DesktopButton	
					iconImage={icon}
					iconImageActive={iconActive}
					iconTitle={title}
					key={title}
					leftPosition={left}
					topPosition={top}
				/>
			))}
			<AboutUs contentOf={IconNames.AboutUs} leftPosition={60} topPosition={70} />
			<Window contentOf={IconNames.Start} leftPosition={80} topPosition={110} />
			<Window contentOf={IconNames.Current} leftPosition={100} topPosition={150} />
			<Window contentOf={IconNames.Previous} leftPosition={120} topPosition={190} />
			<Window contentOf={IconNames.Contact} leftPosition={140} topPosition={230} />
			<Window contentOf={IconNames.Links} leftPosition={160} topPosition={270} />
		</div>
	);
};

const DesktopConsumer = withWindowContext(Desktop);

export { DesktopConsumer as Desktop };
