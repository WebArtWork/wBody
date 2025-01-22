import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BodysleepService } from '../../services/bodysleep.service';
import { Bodysleep } from '../../interfaces/bodysleep.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { bodysleepFormComponents } from '../../formcomponents/bodysleep.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './bodysleep.component.html',
	styleUrls: ['./bodysleep.component.scss'],
	standalone: false,
})
export class BodysleepComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('bodysleep', bodysleepFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._bodysleepService.setPerPage.bind(this._bodysleepService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Bodysleep>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Bodysleep);

					await firstValueFrom(
						this._bodysleepService.create(created as Bodysleep)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Bodysleep): void => {
			this._form
				.modal<Bodysleep>(this.form, [], doc)
				.then((updated: Bodysleep) => {
					this._core.copy(updated, doc);

					this._bodysleepService.update(doc);
				});
		},
		delete: (doc: Bodysleep): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this bodysleep?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._bodysleepService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Bodysleep): void => {
					this._form.modalUnique<Bodysleep>('bodysleep', 'url', doc);
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

	rows: Bodysleep[] = [];

	constructor(
		private _translate: TranslateService,
		private _bodysleepService: BodysleepService,
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
				this._bodysleepService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Bodysleep>(create ? [] : this.rows)
				.then(async (bodysleeps: Bodysleep[]) => {
					if (create) {
						for (const bodysleep of bodysleeps) {
							this._preCreate(bodysleep);

							await firstValueFrom(
								this._bodysleepService.create(bodysleep)
							);
						}
					} else {
						for (const bodysleep of this.rows) {
							if (
								!bodysleeps.find(
									(localBodysleep) => localBodysleep._id === bodysleep._id
								)
							) {
								await firstValueFrom(
									this._bodysleepService.delete(bodysleep)
								);
							}
						}

						for (const bodysleep of bodysleeps) {
							const localBodysleep = this.rows.find(
								(localBodysleep) => localBodysleep._id === bodysleep._id
							);

							if (localBodysleep) {
								this._core.copy(bodysleep, localBodysleep);

								await firstValueFrom(
									this._bodysleepService.update(localBodysleep)
								);
							} else {
								this._preCreate(bodysleep);

								await firstValueFrom(
									this._bodysleepService.create(bodysleep)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(bodysleep: Bodysleep): void {
		delete bodysleep.__created;
	}
}
