export interface WindowMiddlePartProps {
	content: React.ReactNode;
	contentReference: React.RefObject<HTMLDivElement>;
	isActive: boolean;
	scrollDown: () => void;
	scrollUp: () => void;
	wheelScroll: (event: React.WheelEvent) => void;
}