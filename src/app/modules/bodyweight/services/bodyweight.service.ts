import { Injectable } from '@angular/core';
import { Bodyweight } from '../interfaces/bodyweight.interface';
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
export class BodyweightService extends CrudService<Bodyweight> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'bodyweight',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
