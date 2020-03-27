export interface WindowButtonProps {
	buttonIcon: string;
	contentOf?: string;
	isActive: boolean;
	isBottom?: boolean;
	isResize?: boolean;
	isVertical?: boolean;
	onClick?: () => void;
}
