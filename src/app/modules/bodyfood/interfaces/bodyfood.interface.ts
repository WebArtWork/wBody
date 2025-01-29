import { CrudDocument } from 'wacom';

export interface Bodyfood extends CrudDocument {
	name: string;
	body: string;
	description: string;
}
