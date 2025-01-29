import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BodyweightService } from '../../services/bodyweight.service';
import { Bodyweight } from '../../interfaces/bodyweight.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { bodyweightFormComponents } from '../../formcomponents/bodyweight.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './bodyweight.component.html',
	styleUrls: ['./bodyweight.component.scss'],
	standalone: false,
})
export class BodyweightComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('bodyweight', bodyweightFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._bodyweightService.setPerPage.bind(this._bodyweightService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Bodyweight>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Bodyweight);

					await firstValueFrom(
						this._bodyweightService.create(created as Bodyweight)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Bodyweight): void => {
			this._form
				.modal<Bodyweight>(this.form, [], doc)
				.then((updated: Bodyweight) => {
					this._core.copy(updated, doc);

					this._bodyweightService.update(doc);
				});
		},
		delete: (doc: Bodyweight): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this bodyweight?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._bodyweightService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Bodyweight): void => {
					this._form.modalUnique<Bodyweight>('bodyweight', 'url', doc);
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

	rows: Bodyweight[] = [];

	body_id = '';

	constructor(
		private _translate: TranslateService,
		private _bodyweightService: BodyweightService,
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
				this._bodyweightService.get({ page, query: this._query() }).subscribe((rows) => {
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
				.modalDocs<Bodyweight>(create ? [] : this.rows)
				.then(async (bodyweights: Bodyweight[]) => {
					if (create) {
						for (const bodyweight of bodyweights) {
							this._preCreate(bodyweight);

							await firstValueFrom(
								this._bodyweightService.create(bodyweight)
							);
						}
					} else {
						for (const bodyweight of this.rows) {
							if (
								!bodyweights.find(
									(localBodyweight) => localBodyweight._id === bodyweight._id
								)
							) {
								await firstValueFrom(
									this._bodyweightService.delete(bodyweight)
								);
							}
						}

						for (const bodyweight of bodyweights) {
							const localBodyweight = this.rows.find(
								(localBodyweight) => localBodyweight._id === bodyweight._id
							);

							if (localBodyweight) {
								this._core.copy(bodyweight, localBodyweight);

								await firstValueFrom(
									this._bodyweightService.update(localBodyweight)
								);
							} else {
								this._preCreate(bodyweight);

								await firstValueFrom(
									this._bodyweightService.create(bodyweight)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(bodyweight: Bodyweight): void {
		bodyweight.__created = false;

		if(this.body_id) {
			bodyweight.body = this.body_id;
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
