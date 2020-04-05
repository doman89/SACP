/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, useState, useReducer, useEffect} from 'react';
import { ActiveElement } from './interfaces/ActiveElement';
import { FirebaseResponse } from './interfaces/FirebaseResponse';
import { WindowContextState } from './interfaces/WindowContextState';
import { WithWindowContext } from './interfaces/WithWindowContext';

export const WindowContext = createContext<WithWindowContext>({} as WithWindowContext);
const CURSOR_OFFSET_IN_PX = 22;
const MINIMAL_DIMENSION_IN_PX = 100;
const REGEX_FOR_TRANSITION = /\w\((-?\d+)px, (-?\d+)px/;
const SCROLL_OFFSET = 100;

export enum ScrollDirection {
	Up, Right, Down, Left
}

const defaultState: WindowContextState = {
	activeIcon: '',
	activeWindow: '',
	activeElement: {
		cursorPostion: {
			x: 0,
			y: 0, 
		},
		dimensionElement: {
			width: 0,
			height: 0,
		},
		element: null,
		elementPosition: {
			x: 0,
			y: 0,
		},
		isActive: false,
		shouldResize: false,
	},
};

interface Props {
	children: React.ReactNode;
}

const fetchWebsiteData = async (updateState: React.Dispatch<React.SetStateAction<FirebaseResponse | null>>) => {
	const response = await fetch('https://us-central1-silesian-amiga-classic-party.cloudfunctions.net/getWebsiteData', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	});

	const jsonData = await response.json();
	
	updateState(jsonData);
};

const getTranslateProperties = (element: HTMLElement): [number, number] => {
	const translateProperties = element.style.transform.match(REGEX_FOR_TRANSITION);
	const x = Number.parseInt(translateProperties[1] ?? 0);
	const y = Number.parseInt(translateProperties[2] ?? 0);

	return [ x, y ];
};

const scrollIn = (element: HTMLDivElement, direction: ScrollDirection): void => {
	const [ x, y ] = getTranslateProperties(element);

	if (direction === ScrollDirection.Down) {
		element.style.transform = `translate(${x}px, ${y - SCROLL_OFFSET}px)`;
	} else if (direction === ScrollDirection.Up) {
		element.style.transform = `translate(${x}px, ${y + SCROLL_OFFSET}px)`;
	} else if (direction === ScrollDirection.Left) {
		element.style.transform = `translate(${x + SCROLL_OFFSET}px, ${y}px)`;
	} else {
		element.style.transform = `translate(${x - SCROLL_OFFSET}px, ${y}px)`;
	}
};

export const WindowContextProvider = ({children}: Props) => {
	const [state, setState] = useState<WindowContextState>(defaultState);
	const [openedWindows, dispatchWindow] = useReducer((openedWindows: string[], action: { type: string; value: string }) => {
		switch (action.type) {
		case 'add':
			return [...openedWindows, action.value];
		case 'remove':
			return openedWindows.filter(window => window !== action.value);
		default:
			return openedWindows;
		}
	}, []);
	const [websiteData, setWebsiteData] = useState<FirebaseResponse | null>(null);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchWebsiteData(setWebsiteData);
	}, []);

	const changeActiveWindow = (windowName: string): void => {
		setState({
			...state,
			activeWindow: windowName,
		});
	};

	const handleOnMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>, element: HTMLElement, isWindow: boolean, shouldResize = false): void => {
		event.persist();

		if (state.activeElement.isActive) {
			return;
		}

		const { title } = element.dataset;
		const rectData = element.getBoundingClientRect();
		const newActiveElement: ActiveElement = {
			cursorPostion: {
				x: event.clientX,
				y: event.clientY,
			},
			elementPosition: {
				x: rectData.left,
				y: rectData.top - CURSOR_OFFSET_IN_PX,
			},
			dimensionElement: {
				width: rectData.width,
				height: rectData.height,
			},
			element: element,
			isActive: true,
			shouldResize,
		};
		
		if (!isWindow) {
			setState({
				...state,
				activeElement: newActiveElement,
				activeIcon: title as string,
			});
		} else {
			setState({
				...state,
				activeElement: newActiveElement,
				activeWindow: title as string,
			});
		}
	};

	const stopDragging = (): void => {
		setState({
			...state,
			activeElement: {
				...state.activeElement,
				element: null,
				isActive: false,
			}
		});
	};

	

	const handleOnMouseMove = (event: React.MouseEvent): void => {
		const { activeElement } = state;

		if (activeElement.element === null || !activeElement.isActive) {
			return;
		}

		if (!activeElement.shouldResize) {
			const top: number = event.clientY - activeElement.cursorPostion.y + activeElement.elementPosition.y;
			const left: number = event.clientX - activeElement.cursorPostion.x + activeElement.elementPosition.x;

			if (left < 0) {
				activeElement.element.style.left = '0';
			} else if (left + activeElement.dimensionElement.width > window.innerWidth) {
				activeElement.element.style.left = `${window.innerWidth - activeElement.dimensionElement.width}px`;
			} else {
				activeElement.element.style.left = `${left}px`;
			}

			if (top < 0) {
				activeElement.element.style.top = '0';
			} else if (top + activeElement.dimensionElement.height + CURSOR_OFFSET_IN_PX > window.innerHeight) {
				activeElement.element.style.top = `${window.innerHeight - activeElement.dimensionElement.height - CURSOR_OFFSET_IN_PX}px`;
			} else {
				activeElement.element.style.top = `${top}px`;
			}

		} else {
			const width: number = activeElement.dimensionElement.width + (event.clientX - activeElement.cursorPostion.x);
			const height: number = activeElement.dimensionElement.height + (event.clientY - activeElement.cursorPostion.y);

			if (width < MINIMAL_DIMENSION_IN_PX) {
				(activeElement.element as HTMLButtonElement).style.width = `${MINIMAL_DIMENSION_IN_PX}px`;
			} else if ( width > window.innerWidth ) {
				(activeElement.element as HTMLButtonElement).style.width = `${window.innerWidth}px`;
			} else {
				(activeElement.element as HTMLButtonElement).style.width = `${width}px`;
			}
			
			if (height < MINIMAL_DIMENSION_IN_PX) {
				(activeElement.element as HTMLButtonElement).style.height = `${MINIMAL_DIMENSION_IN_PX}px`;
			} else if ( height > window.innerHeight ) {
				(activeElement.element as HTMLButtonElement).style.height = `${window.innerHeight}px`;
			} else {
				(activeElement.element as HTMLButtonElement).style.height = `${height}px`;
			}
		}
	};

	const toggleIcon = (iconName: string, isActive: boolean, shouldOpenWindow = false): void => {
		setState({
			...state,
			activeIcon: isActive ? iconName : '',
			activeWindow: shouldOpenWindow ? iconName : '',
		});
	};

	const clickOnWindow = (windowName: string): void => {
		setState({
			...state,
			activeWindow: windowName,
		});
	};

	const openWindow = (windowName: string): void => {
		if (openedWindows.includes(windowName)) {
			setState({
				...state,
				activeWindow: windowName,
			});

			return;
		}

		setState({
			...state,
			activeWindow: windowName,
		});

		dispatchWindow({ type: 'add', value: windowName});
	};

	const closeWindow = (windowName: string): void => {
		dispatchWindow({ type: 'remove', value: windowName});
	};

	return (
		<WindowContext.Provider
			value={{
				...state,
				openedWindows,
				changeActiveWindow,
				clickOnWindow,
				handleOnMouseDown,
				handleOnMouseMove,
				openWindow,				
				closeWindow,
				scrollIn,
				stopDragging,
				toggleIcon,
				websiteData,
			} as unknown as WithWindowContext}
		>
			{children}
		</WindowContext.Provider>
	);
};
