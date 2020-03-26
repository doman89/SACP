/* eslint-disable react/jsx-handler-names */
import React, { PureComponent } from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { DesktopButton } from '../DesktopButton/DesktopButton';
import { Window } from './../Window/Window';
import { WindowContext } from '../../contexts/WindowContext';
import { desktopIcons } from './helpers/desktopIcons';
import { IconNames } from './helpers/iconNames';
import { default as DesktopStyles } from './Desktop.module.scss';

const style = bemCssModules(DesktopStyles);

export class Desktop extends PureComponent {
	private readonly DESKTOP_CLASS: string = 'desktop';
	public static contextType = WindowContext;

	public state = {
		isVisibleAboutUs: false,
		isVisibleContact: false,
		isVisibleCurrent: false,
		isVisibleLinks: false,
		isVisiblePrevious: false,
		isVisibleStart: false,
	};

	public render(): JSX.Element {
		const {
			handleOnMouseMove,
			stopDragging,
		} = this.context;

		const { 
			isVisibleAboutUs,
			isVisibleContact,
			isVisibleCurrent,
			isVisibleLinks,
			isVisiblePrevious,
			isVisibleStart,
		} = this.state;

		return (
			<div className={style()} onClick={this.handleOnClickDesktop} onMouseMove={handleOnMouseMove} onMouseUp={stopDragging}>
				{desktopIcons.map(({icon, iconActive, left, title, top}) => (
					<DesktopButton
						handleOnClick={this.handleOnClick}
						handleOnMouseDown={this.handleOnMouseDown}
						handleOnMouseUp={stopDragging}
						iconImage={icon}
						iconImageActive={iconActive}
						iconTitle={title}
						key={title}
						leftPosition={left}
						topPosition={top}
					/>
				))}
				<Window contentOf={IconNames.AboutUs} isVisible={isVisibleAboutUs} leftPosition={60} setVisibility={this.toggleWindows} topPosition={70} />
				<Window contentOf={IconNames.Start} isVisible={isVisibleStart} leftPosition={80} setVisibility={this.toggleWindows} topPosition={110} />
				<Window contentOf={IconNames.Current} isVisible={isVisibleCurrent} leftPosition={100} setVisibility={this.toggleWindows} topPosition={150} />
				<Window contentOf={IconNames.Previous} isVisible={isVisiblePrevious} leftPosition={120} setVisibility={this.toggleWindows} topPosition={190} />
				<Window contentOf={IconNames.Contact} isVisible={isVisibleContact} leftPosition={140} setVisibility={this.toggleWindows} topPosition={230} />
				<Window contentOf={IconNames.Links} isVisible={isVisibleLinks} leftPosition={160} setVisibility={this.toggleWindows} topPosition={270} />
			</div>
		);
	}

	private readonly handleOnClickDesktop = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		if ((event.target as HTMLElement).classList.contains(this.DESKTOP_CLASS)) {
			this.context.changeActiveWindow('');
			this.context.stopDragging();
		}		
	};

	private readonly handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		const { title } = (event.target as HTMLElement).dataset;

		this.toggleWindows(title ?? '', true);
	};

	private readonly handleOnMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		const element = event.currentTarget;

		this.context.handleOnMouseDown(event, element);
	};

	private readonly toggleWindows = (title: string, state: boolean): void => {
		this.context.changeActiveWindow(title);

		if (title === IconNames.AboutUs) {
			this.setState(() => ({
				isVisibleAboutUs: state,
			}));
		} else if (title === IconNames.Start) {
			this.setState(() => ({
				isVisibleStart: state,
			}));
		} else if (title === IconNames.Current) {
			this.setState(() => ({
				isVisibleCurrent: state,
			}));
		} else if (title === IconNames.Previous) {
			this.setState(() => ({
				isVisiblePrevious: state,
			}));
		} else if (title === IconNames.Contact) {
			this.setState(() => ({
				isVisibleContact: state,
			}));
		} else if (title === IconNames.Links) {
			this.setState(() => ({
				isVisibleLinks: state,
			}));
		}
	};
}
