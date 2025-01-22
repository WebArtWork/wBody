import { Injectable } from '@angular/core';
import { Bodyexercise } from '../interfaces/bodyexercise.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class BodyexerciseService extends CrudService<Bodyexercise> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'bodyexercise',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
