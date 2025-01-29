import { CrudDocument } from 'wacom';

export interface Bodytarget extends CrudDocument {
	name: string;
	body: string;
	description: string;
}
