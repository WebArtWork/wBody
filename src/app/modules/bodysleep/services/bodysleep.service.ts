import { Injectable } from '@angular/core';
import { Bodysleep } from '../interfaces/bodysleep.interface';
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
export class BodysleepService extends CrudService<Bodysleep> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'bodysleep',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
