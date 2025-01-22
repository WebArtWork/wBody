import { Injectable } from '@angular/core';
import { Bodyhabit } from '../interfaces/bodyhabit.interface';
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
export class BodyhabitService extends CrudService<Bodyhabit> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'bodyhabit',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
