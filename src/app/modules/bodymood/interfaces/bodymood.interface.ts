import { CrudDocument } from 'wacom';

export interface Bodymood extends CrudDocument {
	name: string;
	description: string;
}
