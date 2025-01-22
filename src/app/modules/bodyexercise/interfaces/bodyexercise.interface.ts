import { CrudDocument } from 'wacom';

export interface Bodyexercise extends CrudDocument {
	name: string;
	description: string;
}
