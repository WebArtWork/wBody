import { Injectable } from '@angular/core';
import { Body } from '../interfaces/body.interface';
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
export class BodyService extends CrudService<Body> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'body',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
