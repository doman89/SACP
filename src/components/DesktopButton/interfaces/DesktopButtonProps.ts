export interface DesktopButtonProps {
	handleOnClick: () => void;
	handleOnMouseDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleOnMouseUp: () => void;
	iconImage: string;
	iconTitle: string;
	leftPosition: number;
	topPosition: number; 
}
