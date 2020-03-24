export interface DesktopButtonProps {
	handleOnClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	handleOnMouseDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleOnMouseUp: () => void;
	iconImage: string;
	iconImageActive: string;
	iconTitle: string;
	leftPosition: number;
	topPosition: number; 
}
