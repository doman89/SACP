export interface WindowLabelProps {
	handleOnMouseDown:  (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	isActive: boolean;
	title: string;
}
