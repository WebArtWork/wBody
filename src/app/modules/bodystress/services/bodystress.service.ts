import { Injectable } from '@angular/core';
import { Bodystress } from '../interfaces/bodystress.interface';
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
export class BodystressService extends CrudService<Bodystress> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'bodystress',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
