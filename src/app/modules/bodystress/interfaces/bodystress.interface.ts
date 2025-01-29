import { CrudDocument } from 'wacom';

export interface Bodystress extends CrudDocument {
	name: string;
	body: string;
	description: string;
}
