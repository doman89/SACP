/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, useState, useReducer} from 'react';
import { ActiveElement } from './interfaces/ActiveElement';
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
		element: null,
		elementPosition: {
			x: 0,
			y: 0,
		},
		resizePosition: {
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
				x: Math.floor(event.clientX),
				y: Math.floor(event.clientY),
			},
			elementPosition: {
				x: Math.floor(rectData.left),
				y: Math.floor(rectData.top - CURSOR_OFFSET_IN_PX ),
			},
			resizePosition: {
				x: Math.floor(window.innerWidth - rectData.right),
				y: Math.floor(window.innerHeight - rectData.bottom),
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

	const handleResizeWindow = (event: React.MouseEvent): void => {
		const { activeElement } = state;

		(activeElement.element as HTMLButtonElement).style.right =  `${Math.floor(activeElement.resizePosition.x - (event.clientX - activeElement.cursorPostion.x))}px`;
		(activeElement.element as HTMLButtonElement).style.bottom =  `${Math.floor(activeElement.resizePosition.y - (event.clientY - activeElement.cursorPostion.y))}px`;
	}

	const handleOnMouseMove = (event: React.MouseEvent, isWindow = false): void => {
		const { activeElement } = state;

		if (Boolean(activeElement.element) && activeElement.isActive) {
			if (!activeElement.shouldResize) {
				(activeElement.element as HTMLButtonElement).style.top = `${Math.floor(event.clientY - activeElement.cursorPostion.y + activeElement.elementPosition.y)}px`;
				(activeElement.element as HTMLButtonElement).style.left = `${Math.floor(event.clientX - activeElement.cursorPostion.x + activeElement.elementPosition.x)}px`;
			}

			if (isWindow) {
				(activeElement.element as HTMLButtonElement).style.right = `${Math.floor(activeElement.resizePosition.x - (event.clientX - activeElement.cursorPostion.x))}px`;
				(activeElement.element as HTMLButtonElement).style.bottom = `${Math.floor(activeElement.resizePosition.y - (event.clientY - activeElement.cursorPostion.y) - 11)}px`;
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
				handleResizeWindow,
				openWindow,				
				closeWindow,
				stopDragging,
				toggleIcon,
			} as unknown as WithWindowContext}
		>
			{children}
		</WindowContext.Provider>
	);
};
