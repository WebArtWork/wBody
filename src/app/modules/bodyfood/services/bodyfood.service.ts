import { Injectable } from '@angular/core';
import { Bodyfood } from '../interfaces/bodyfood.interface';
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
export class BodyfoodService extends CrudService<Bodyfood> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'bodyfood',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
