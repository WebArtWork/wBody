import { CrudDocument } from 'wacom';

export interface Body extends CrudDocument {
	name: string;
	description: string;
}
