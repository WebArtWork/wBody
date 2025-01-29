import { CrudDocument } from 'wacom';

export interface Bodymood extends CrudDocument {
	name: string;
	body: string;
	description: string;
}
