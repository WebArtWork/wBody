import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BodyexerciseService } from '../../services/bodyexercise.service';
import { Bodyexercise } from '../../interfaces/bodyexercise.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { bodyexerciseFormComponents } from '../../formcomponents/bodyexercise.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './bodyexercise.component.html',
	styleUrls: ['./bodyexercise.component.scss'],
	standalone: false,
})
export class BodyexerciseComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('bodyexercise', bodyexerciseFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._bodyexerciseService.setPerPage.bind(this._bodyexerciseService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Bodyexercise>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Bodyexercise);

					await firstValueFrom(
						this._bodyexerciseService.create(created as Bodyexercise)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Bodyexercise): void => {
			this._form
				.modal<Bodyexercise>(this.form, [], doc)
				.then((updated: Bodyexercise) => {
					this._core.copy(updated, doc);

					this._bodyexerciseService.update(doc);
				});
		},
		delete: (doc: Bodyexercise): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this bodyexercise?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._bodyexerciseService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Bodyexercise): void => {
					this._form.modalUnique<Bodyexercise>('bodyexercise', 'url', doc);
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

	rows: Bodyexercise[] = [];

	body_id = '';

	constructor(
		private _translate: TranslateService,
		private _bodyexerciseService: BodyexerciseService,
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
				this._bodyexerciseService.get({ page, query: this._query() }).subscribe((rows) => {
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
				.modalDocs<Bodyexercise>(create ? [] : this.rows)
				.then(async (bodyexercises: Bodyexercise[]) => {
					if (create) {
						for (const bodyexercise of bodyexercises) {
							this._preCreate(bodyexercise);

							await firstValueFrom(
								this._bodyexerciseService.create(bodyexercise)
							);
						}
					} else {
						for (const bodyexercise of this.rows) {
							if (
								!bodyexercises.find(
									(localBodyexercise) => localBodyexercise._id === bodyexercise._id
								)
							) {
								await firstValueFrom(
									this._bodyexerciseService.delete(bodyexercise)
								);
							}
						}

						for (const bodyexercise of bodyexercises) {
							const localBodyexercise = this.rows.find(
								(localBodyexercise) => localBodyexercise._id === bodyexercise._id
							);

							if (localBodyexercise) {
								this._core.copy(bodyexercise, localBodyexercise);

								await firstValueFrom(
									this._bodyexerciseService.update(localBodyexercise)
								);
							} else {
								this._preCreate(bodyexercise);

								await firstValueFrom(
									this._bodyexerciseService.create(bodyexercise)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(bodyexercise: Bodyexercise): void {
		bodyexercise.__created = false;

		if(this.body_id) {
			bodyexercise.body = this.body_id;
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
