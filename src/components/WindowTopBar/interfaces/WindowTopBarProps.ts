export interface WindowTopBarProps {
	contentOf: string;
	handleOnMouseDown:  (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	handleOnMouseUp: () => void;
	isActive: boolean;
	minimizeWindow: () => void;
	onClose: () => void;
	toggleUnderside: () => void;
}
