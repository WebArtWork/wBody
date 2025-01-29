import { CrudDocument } from 'wacom';

export interface Bodyexercise extends CrudDocument {
	name: string;
	body: string;
	description: string;
}
