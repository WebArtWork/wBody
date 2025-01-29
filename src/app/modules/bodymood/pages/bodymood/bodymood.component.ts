import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BodymoodService } from '../../services/bodymood.service';
import { Bodymood } from '../../interfaces/bodymood.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { bodymoodFormComponents } from '../../formcomponents/bodymood.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './bodymood.component.html',
	styleUrls: ['./bodymood.component.scss'],
	standalone: false,
})
export class BodymoodComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('bodymood', bodymoodFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._bodymoodService.setPerPage.bind(this._bodymoodService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Bodymood>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Bodymood);

					await firstValueFrom(
						this._bodymoodService.create(created as Bodymood)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Bodymood): void => {
			this._form
				.modal<Bodymood>(this.form, [], doc)
				.then((updated: Bodymood) => {
					this._core.copy(updated, doc);

					this._bodymoodService.update(doc);
				});
		},
		delete: (doc: Bodymood): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this bodymood?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._bodymoodService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Bodymood): void => {
					this._form.modalUnique<Bodymood>('bodymood', 'url', doc);
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

	rows: Bodymood[] = [];

	body_id = '';

	constructor(
		private _translate: TranslateService,
		private _bodymoodService: BodymoodService,
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
				this._bodymoodService.get({ page, query: this._query() }).subscribe((rows) => {
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
				.modalDocs<Bodymood>(create ? [] : this.rows)
				.then(async (bodymoods: Bodymood[]) => {
					if (create) {
						for (const bodymood of bodymoods) {
							this._preCreate(bodymood);

							await firstValueFrom(
								this._bodymoodService.create(bodymood)
							);
						}
					} else {
						for (const bodymood of this.rows) {
							if (
								!bodymoods.find(
									(localBodymood) => localBodymood._id === bodymood._id
								)
							) {
								await firstValueFrom(
									this._bodymoodService.delete(bodymood)
								);
							}
						}

						for (const bodymood of bodymoods) {
							const localBodymood = this.rows.find(
								(localBodymood) => localBodymood._id === bodymood._id
							);

							if (localBodymood) {
								this._core.copy(bodymood, localBodymood);

								await firstValueFrom(
									this._bodymoodService.update(localBodymood)
								);
							} else {
								this._preCreate(bodymood);

								await firstValueFrom(
									this._bodymoodService.create(bodymood)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(bodymood: Bodymood): void {
		bodymood.__created= false;

		if(this.body_id) {
			bodymood.body = this.body_id;
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
