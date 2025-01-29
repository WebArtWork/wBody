import { CrudDocument } from 'wacom';

export interface Bodyweight extends CrudDocument {
	name: string;
	body: string;
	description: string;
}
