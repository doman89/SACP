export interface WindowTopBarProps {
	contentOf: string;
	handleOnMouseDown:  (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	isActive: boolean;
	minimizeWindow: () => void;
	onClose: () => void;
	toggleUnderside: () => void;
}
