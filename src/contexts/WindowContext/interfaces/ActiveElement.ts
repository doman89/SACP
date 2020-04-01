
import { Position } from './Position';

export interface ActiveElement {
	cursorPostion: Position;
	element: HTMLElement | null;
	elementPosition: Position;
	isActive: boolean;
	resizePosition: Position;
	shouldResize: boolean;
}
