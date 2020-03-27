export interface WindowLabelProps {
	handleOnMouseDown:  (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	handleOnMouseUp: () => void;
	isActive: boolean;
	title: string;
}
