import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BodytargetService } from '../../services/bodytarget.service';
import { Bodytarget } from '../../interfaces/bodytarget.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { bodytargetFormComponents } from '../../formcomponents/bodytarget.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './bodytarget.component.html',
	styleUrls: ['./bodytarget.component.scss'],
	standalone: false,
})
export class BodytargetComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('bodytarget', bodytargetFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._bodytargetService.setPerPage.bind(this._bodytargetService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Bodytarget>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Bodytarget);

					await firstValueFrom(
						this._bodytargetService.create(created as Bodytarget)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Bodytarget): void => {
			this._form
				.modal<Bodytarget>(this.form, [], doc)
				.then((updated: Bodytarget) => {
					this._core.copy(updated, doc);

					this._bodytargetService.update(doc);
				});
		},
		delete: (doc: Bodytarget): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this bodytarget?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._bodytargetService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Bodytarget): void => {
					this._form.modalUnique<Bodytarget>('bodytarget', 'url', doc);
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

	rows: Bodytarget[] = [];

	constructor(
		private _translate: TranslateService,
		private _bodytargetService: BodytargetService,
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
				this._bodytargetService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Bodytarget>(create ? [] : this.rows)
				.then(async (bodytargets: Bodytarget[]) => {
					if (create) {
						for (const bodytarget of bodytargets) {
							this._preCreate(bodytarget);

							await firstValueFrom(
								this._bodytargetService.create(bodytarget)
							);
						}
					} else {
						for (const bodytarget of this.rows) {
							if (
								!bodytargets.find(
									(localBodytarget) => localBodytarget._id === bodytarget._id
								)
							) {
								await firstValueFrom(
									this._bodytargetService.delete(bodytarget)
								);
							}
						}

						for (const bodytarget of bodytargets) {
							const localBodytarget = this.rows.find(
								(localBodytarget) => localBodytarget._id === bodytarget._id
							);

							if (localBodytarget) {
								this._core.copy(bodytarget, localBodytarget);

								await firstValueFrom(
									this._bodytargetService.update(localBodytarget)
								);
							} else {
								this._preCreate(bodytarget);

								await firstValueFrom(
									this._bodytargetService.create(bodytarget)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(bodytarget: Bodytarget): void {
		delete bodytarget.__created;
	}
}
