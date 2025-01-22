import { Injectable } from '@angular/core';
import { Bodymood } from '../interfaces/bodymood.interface';
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
export class BodymoodService extends CrudService<Bodymood> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'bodymood',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
