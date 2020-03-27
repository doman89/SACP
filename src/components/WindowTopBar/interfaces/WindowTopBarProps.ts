export interface WindowTopBarProps {
	contentOf: string;
	handleOnMouseDown:  (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	handleOnMouseUp: () => void;
	isActive: boolean;
	onClose: () => void;
}
