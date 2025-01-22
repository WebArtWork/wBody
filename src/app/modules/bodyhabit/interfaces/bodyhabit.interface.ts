import { CrudDocument } from 'wacom';

export interface Bodyhabit extends CrudDocument {
	name: string;
	description: string;
}
