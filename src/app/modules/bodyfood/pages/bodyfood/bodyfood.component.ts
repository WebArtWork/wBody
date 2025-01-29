import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BodyfoodService } from '../../services/bodyfood.service';
import { Bodyfood } from '../../interfaces/bodyfood.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { bodyfoodFormComponents } from '../../formcomponents/bodyfood.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './bodyfood.component.html',
	styleUrls: ['./bodyfood.component.scss'],
	standalone: false,
})
export class BodyfoodComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('bodyfood', bodyfoodFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._bodyfoodService.setPerPage.bind(this._bodyfoodService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Bodyfood>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Bodyfood);

					await firstValueFrom(
						this._bodyfoodService.create(created as Bodyfood)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Bodyfood): void => {
			this._form
				.modal<Bodyfood>(this.form, [], doc)
				.then((updated: Bodyfood) => {
					this._core.copy(updated, doc);

					this._bodyfoodService.update(doc);
				});
		},
		delete: (doc: Bodyfood): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this bodyfood?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._bodyfoodService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Bodyfood): void => {
					this._form.modalUnique<Bodyfood>('bodyfood', 'url', doc);
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

	rows: Bodyfood[] = [];

	body_id = '';

	constructor(
		private _translate: TranslateService,
		private _bodyfoodService: BodyfoodService,
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
				this._bodyfoodService.get({ page, query: this._query()  }).subscribe((rows) => {
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
				.modalDocs<Bodyfood>(create ? [] : this.rows)
				.then(async (bodyfoods: Bodyfood[]) => {
					if (create) {
						for (const bodyfood of bodyfoods) {
							this._preCreate(bodyfood);

							await firstValueFrom(
								this._bodyfoodService.create(bodyfood)
							);
						}
					} else {
						for (const bodyfood of this.rows) {
							if (
								!bodyfoods.find(
									(localBodyfood) => localBodyfood._id === bodyfood._id
								)
							) {
								await firstValueFrom(
									this._bodyfoodService.delete(bodyfood)
								);
							}
						}

						for (const bodyfood of bodyfoods) {
							const localBodyfood = this.rows.find(
								(localBodyfood) => localBodyfood._id === bodyfood._id
							);

							if (localBodyfood) {
								this._core.copy(bodyfood, localBodyfood);

								await firstValueFrom(
									this._bodyfoodService.update(localBodyfood)
								);
							} else {
								this._preCreate(bodyfood);

								await firstValueFrom(
									this._bodyfoodService.create(bodyfood)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(bodyfood: Bodyfood): void {
		bodyfood.__created = false;
		if(this.body_id) {
			bodyfood.body = this.body_id;
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
