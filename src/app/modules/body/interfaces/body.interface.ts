import { CrudDocument } from 'wacom';

export interface Body extends CrudDocument {
	exercise: string;
	food: string;
	habit: string;
	mood: string;
	sleep: string;
	stress: string;
	target: string;
	weight: string;
	body: string;
	name: string;        
	description: string; 
}
