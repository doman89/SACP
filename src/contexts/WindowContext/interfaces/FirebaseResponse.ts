import { Memeber } from './Memeber';

export interface FirebaseResponse {
	aboutUs: {
		sectionDescription: string;
		members: Memeber[];
	};
}
