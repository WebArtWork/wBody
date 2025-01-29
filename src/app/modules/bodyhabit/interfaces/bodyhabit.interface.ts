import { CrudDocument } from 'wacom';

export interface Bodyhabit extends CrudDocument {
	name: string;
	body: string;
	description: string;
}
