import { CrudDocument } from 'wacom';

export interface Bodyfood extends CrudDocument {
	name: string;
	description: string;
}
