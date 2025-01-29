import { CrudDocument } from 'wacom';

export interface Bodysleep extends CrudDocument {
	name: string;
	body: string;
	description: string;
}
