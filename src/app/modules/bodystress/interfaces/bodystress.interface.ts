import { CrudDocument } from 'wacom';

export interface Bodystress extends CrudDocument {
	name: string;
	description: string;
}
