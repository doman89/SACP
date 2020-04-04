
import { Dimension } from './Dimension';
import { Position } from './Position';

export interface ActiveElement {
	cursorPostion: Position;
	dimensionElement: Dimension;
	element: HTMLElement | null;
	elementPosition: Position;
	isActive: boolean;
	shouldResize: boolean;
}
