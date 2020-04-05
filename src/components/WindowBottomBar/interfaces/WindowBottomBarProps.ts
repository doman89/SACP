export interface WindowBottomBarProps {
	isActive: boolean;
	handleResizeWindow: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	scrollLeft: () => void;
	scrollRight: () => void;
}
