import { WindowContextState } from './WindowContextState';

export interface Context extends WindowContextState {
	changeActiveWindow: (windowName: string) => void;
	clickOnWindow: (windowName: string) => void;
	closeWindow: (windowName: string) => void;
	handleOnMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>, element: HTMLElement, isWindow: boolean) => void;
	handleOnMouseMove: (event: React.MouseEvent, isWindow?: boolean) => void;
	openWindow: (windowName: string) => void;
	openedWindows: string[];
	state: WindowContextState;				
	stopDragging: () => void;
	toggleIcon: (iconName: string, state: boolean, shouldOpenWindow?: boolean) => void;
}

export interface WithWindowContext {
	context: Context;
}


// changeActiveWindow: this.changeActiveWindow,
// clickOnWindow: this.clickOnWindow,
// closeWindow: this.closeWindow,
// handleOnMouseDown: this.handleOnMouseDown,
// handleOnMouseMove: this.handleOnMouseMove,
// openWindow: this.openWindow,				
// stopDragging: this.stopDragging,
// toggleIcon: this.toggleIcon,