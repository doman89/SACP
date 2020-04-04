/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, useState, useReducer, useEffect} from 'react';
import { ActiveElement } from './interfaces/ActiveElement';
import { FirebaseResponse } from './interfaces/FirebaseResponse';
import { WindowContextState } from './interfaces/WindowContextState';
import { WithWindowContext } from './interfaces/WithWindowContext';

export const WindowContext = createContext<WithWindowContext>({} as WithWindowContext);

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

const CURSOR_OFFSET_IN_PX = 22;

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

		if (activeElement.element === null && !activeElement.isActive) {
			return;
		}

		if (!activeElement.shouldResize) {
			(activeElement.element as HTMLButtonElement).style.top = `${event.clientY - activeElement.cursorPostion.y + activeElement.elementPosition.y}px`;
			(activeElement.element as HTMLButtonElement).style.left = `${event.clientX - activeElement.cursorPostion.x + activeElement.elementPosition.x}px`;
		} else {
			(activeElement.element as HTMLButtonElement).style.width =  `${activeElement.dimensionElement.width + (event.clientX - activeElement.cursorPostion.x)}px`;
			(activeElement.element as HTMLButtonElement).style.height =  `${activeElement.dimensionElement.height + (event.clientY - activeElement.cursorPostion.y)}px`;
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
				stopDragging,
				toggleIcon,
				websiteData,
			} as unknown as WithWindowContext}
		>
			{children}
		</WindowContext.Provider>
	);
};
