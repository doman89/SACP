export interface WindowButtonProps {
	buttonIcon: string;
	contentOf?: string;
	isActive: boolean;
	isBottom?: boolean;
	isResize?: boolean;
	isVertical?: boolean;
	onClick?: () => void;
	onMouseDown?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
