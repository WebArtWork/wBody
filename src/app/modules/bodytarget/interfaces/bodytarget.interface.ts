import { CrudDocument } from 'wacom';

export interface Bodytarget extends CrudDocument {
	name: string;
	description: string;
}
