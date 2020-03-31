import { WithWindowContext } from '../../../contexts/WindowContext/interfaces/WithWindowContext';

export interface DesktopButtonProps extends WithWindowContext {
	iconImage: string;
	iconImageActive: string;
	iconTitle: string;
	leftPosition: number;
	topPosition: number; 
}
