import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BodystressService } from '../../services/bodystress.service';
import { Bodystress } from '../../interfaces/bodystress.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { bodystressFormComponents } from '../../formcomponents/bodystress.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './bodystress.component.html',
	styleUrls: ['./bodystress.component.scss'],
	standalone: false,
})
export class BodystressComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('bodystress', bodystressFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._bodystressService.setPerPage.bind(this._bodystressService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Bodystress>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Bodystress);

					await firstValueFrom(
						this._bodystressService.create(created as Bodystress)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Bodystress): void => {
			this._form
				.modal<Bodystress>(this.form, [], doc)
				.then((updated: Bodystress) => {
					this._core.copy(updated, doc);

					this._bodystressService.update(doc);
				});
		},
		delete: (doc: Bodystress): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this bodystress?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._bodystressService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Bodystress): void => {
					this._form.modalUnique<Bodystress>('bodystress', 'url', doc);
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

	rows: Bodystress[] = [];

	body_id = '';

	constructor(
		private _translate: TranslateService,
		private _bodystressService: BodystressService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.setRows();
		this._route.paramMap.subscribe(params => {

			this.body_id = params.get('body_id') || '';
			console.log (this.body_id);
		})
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._bodystressService.get({ page, query: this._query() }).subscribe((rows) => {
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
				.modalDocs<Bodystress>(create ? [] : this.rows)
				.then(async (bodystresss: Bodystress[]) => {
					if (create) {
						for (const bodystress of bodystresss) {
							this._preCreate(bodystress);

							await firstValueFrom(
								this._bodystressService.create(bodystress)
							);
						}
					} else {
						for (const bodystress of this.rows) {
							if (
								!bodystresss.find(
									(localBodystress) => localBodystress._id === bodystress._id
								)
							) {
								await firstValueFrom(
									this._bodystressService.delete(bodystress)
								);
							}
						}

						for (const bodystress of bodystresss) {
							const localBodystress = this.rows.find(
								(localBodystress) => localBodystress._id === bodystress._id
							);

							if (localBodystress) {
								this._core.copy(bodystress, localBodystress);

								await firstValueFrom(
									this._bodystressService.update(localBodystress)
								);
							} else {
								this._preCreate(bodystress);

								await firstValueFrom(
									this._bodystressService.create(bodystress)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(bodystress: Bodystress): void {
		bodystress.__created = false;

		if(this.body_id) {
			bodystress.body = this.body_id;
		}
	}

	private _query(): string{
		let query = '';
		if (this.body_id) {
			query +=(query?'&' : '') +'body=' + this.body_id;
		}
		return '';
	}
}
