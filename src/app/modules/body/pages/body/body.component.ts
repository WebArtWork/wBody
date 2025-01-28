import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BodyService } from '../../services/body.service';
import { Body } from '../../interfaces/body.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { bodyFormComponents } from '../../formcomponents/body.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './body.component.html',
	styleUrls: ['./body.component.scss'],
	standalone: false,
})
export class BodyComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('body', bodyFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._bodyService.setPerPage.bind(this._bodyService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Body>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Body);

					await firstValueFrom(
						this._bodyService.create(created as Body)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Body): void => {
			this._form
				.modal<Body>(this.form, [], doc)
				.then((updated: Body) => {
					this._core.copy(updated, doc);

					this._bodyService.update(doc);
				});
		},
		delete: (doc: Body): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this body?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._bodyService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'fitness_center',
				hrefFunc: (doc: Body): string => {
					return '/bodyexercise/' + doc._id;
				},
			},
			{
				icon: 'fastfood',
				hrefFunc: (doc: Body): string => {
					return '/bodyfood/' + doc._id;
				},
			},
			{
				icon: 'calendar_today',
				hrefFunc: (doc: Body): string => {
					return '/bodyhabit/' + doc._id;
				},
			},
			{
				icon: 'mood',
				hrefFunc: (doc: Body): string => {
					return '/bodymood/' + doc._id;
				},
			},
		{
			icon: 'bedtime',
			hrefFunc: (doc: Body): string => {
				return '/bodysleep/' + doc._id;
			},
		},
		{
			icon: 'flag',
			hrefFunc: (doc: Body): string => {
				return '/bodytarget/' + doc._id;
			},
		},
		{
			icon: 'self_improvement',
			hrefFunc: (doc: Body): string => {
				return '/bodystress/' + doc._id;
			},
		},
		{
			icon: 'monitor_weight',
			hrefFunc: (doc: Body): string => {
				return '/bodyweight/' + doc._id;
			},
		},
			{
				icon: 'cloud_download',
				click: (doc: Body): void => {
					this._form.modalUnique<Body>('body', 'url', doc);
				},
			},
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
	};

	rows: Body[] = [];

	constructor(
		private _translate: TranslateService,
		private _bodyService: BodyService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._bodyService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Body>(create ? [] : this.rows)
				.then(async (bodys: Body[]) => {
					if (create) {
						for (const body of bodys) {
							this._preCreate(body);

							await firstValueFrom(
								this._bodyService.create(body)
							);
						}
					} else {
						for (const body of this.rows) {
							if (
								!bodys.find(
									(localBody) => localBody._id === body._id
								)
							) {
								await firstValueFrom(
									this._bodyService.delete(body)
								);
							}
						}

						for (const body of bodys) {
							const localBody = this.rows.find(
								(localBody) => localBody._id === body._id
							);

							if (localBody) {
								this._core.copy(body, localBody);

								await firstValueFrom(
									this._bodyService.update(localBody)
								);
							} else {
								this._preCreate(body);

								await firstValueFrom(
									this._bodyService.create(body)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(body: Body): void {
		delete body.__created;
	}
}
