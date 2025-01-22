import { Injectable } from '@angular/core';
import { Bodytarget } from '../interfaces/bodytarget.interface';
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
export class BodytargetService extends CrudService<Bodytarget> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'bodytarget',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
