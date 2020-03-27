import React, { createContext, PureComponent } from 'react';

export const WindowContext = createContext({});

interface Position {
	x: number;
	y: number;
}

interface ActiveElement {
	cursorPostion: Position;
	element: HTMLElement | null;
	elementPosition: Position;
	isActive: boolean;
}

interface WindowContextState {
	activeWindow: string;
	activeElement: ActiveElement;
}

export class WindowContextProvider extends PureComponent<React.ComponentType, WindowContextState> {
	public state: WindowContextState = {
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
			isActive: false,
		}
	};

	public render(): JSX.Element {
		return (
			<WindowContext.Provider
				value={{				
					...this.state,
					changeActiveWindow: this.changeActiveWindow,
					handleOnMouseDown: this.handleOnMouseDown,
					handleOnMouseMove: this.handleOnMouseMove,
					stopDragging: this.stopDragging,
				}}
			>
				{this.props.children}
			</WindowContext.Provider>

		);
	}

	public changeActiveWindow = (windowName: string): void => {
		this.setState({
			activeWindow: windowName,
		});
	};

	public readonly handleOnMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>, element: HTMLElement): void => {
		event.persist();
		const { activeElement } = this.state;

		if (!activeElement.isActive) {
			this.setState(() => ({
				activeElement: {
					cursorPostion: {
						x: event.clientX,
						y: event.clientY,
					},
					elementPosition: {
						x: Number.parseInt(element.style.left),
						y: Number.parseInt(element.style.top),
					},
					element: element,
					isActive: true,
				}
			}));
		}
	};

	public readonly stopDragging = (): void => {
		this.setState((prevState: WindowContextState) => ({
			activeElement: {
				...prevState.activeElement,
				element: null,
				isActive: false,
			}
		}));
	};

	public readonly handleOnMouseMove = (event: React.MouseEvent): void => {
		const { activeElement } = this.state;

		if (Boolean(activeElement.element) && activeElement.isActive) {
			(activeElement.element as HTMLButtonElement).style.top = `${event.clientY - activeElement.cursorPostion.y + activeElement.elementPosition.y}px`;
			(activeElement.element as HTMLButtonElement).style.left =  `${event.clientX - activeElement.cursorPostion.x + activeElement.elementPosition.x}px`;
		}
	};
}
