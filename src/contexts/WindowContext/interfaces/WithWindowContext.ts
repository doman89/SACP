import { WindowContextState } from './WindowContextState';
import { FirebaseResponse } from '../WindowContext';

export interface Context extends WindowContextState {
	changeActiveWindow: (windowName: string) => void;
	clickOnWindow: (windowName: string) => void;
	closeWindow: (windowName: string) => void;
	handleOnMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>, element: HTMLElement, isWindow: boolean, shouldResize?: boolean) => void;
	handleOnMouseMove: (event: React.MouseEvent, isWindow?: boolean) => void;
	openWindow: (windowName: string) => void;
	openedWindows: string[];
	state: WindowContextState;				
	stopDragging: () => void;
	toggleIcon: (iconName: string, state: boolean, shouldOpenWindow?: boolean) => void;
	websiteData: FirebaseResponse | null;
}

export interface WithWindowContext {
	context: Context;
}
