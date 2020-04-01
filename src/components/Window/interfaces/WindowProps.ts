import { WithWindowContext } from '../../../contexts/WindowContext/interfaces/WithWindowContext';

export interface WindowProps extends WithWindowContext {
	contentOf: string;
	leftPosition: number;
	topPosition: number;
}
