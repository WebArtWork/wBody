import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BodyhabitService } from '../../services/bodyhabit.service';
import { Bodyhabit } from '../../interfaces/bodyhabit.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { bodyhabitFormComponents } from '../../formcomponents/bodyhabit.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './bodyhabit.component.html',
	styleUrls: ['./bodyhabit.component.scss'],
	standalone: false,
})
export class BodyhabitComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('bodyhabit', bodyhabitFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._bodyhabitService.setPerPage.bind(this._bodyhabitService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Bodyhabit>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Bodyhabit);

					await firstValueFrom(
						this._bodyhabitService.create(created as Bodyhabit)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Bodyhabit): void => {
			this._form
				.modal<Bodyhabit>(this.form, [], doc)
				.then((updated: Bodyhabit) => {
					this._core.copy(updated, doc);

					this._bodyhabitService.update(doc);
				});
		},
		delete: (doc: Bodyhabit): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this bodyhabit?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._bodyhabitService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Bodyhabit): void => {
					this._form.modalUnique<Bodyhabit>('bodyhabit', 'url', doc);
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

	rows: Bodyhabit[] = [];

	constructor(
		private _translate: TranslateService,
		private _bodyhabitService: BodyhabitService,
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
				this._bodyhabitService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Bodyhabit>(create ? [] : this.rows)
				.then(async (bodyhabits: Bodyhabit[]) => {
					if (create) {
						for (const bodyhabit of bodyhabits) {
							this._preCreate(bodyhabit);

							await firstValueFrom(
								this._bodyhabitService.create(bodyhabit)
							);
						}
					} else {
						for (const bodyhabit of this.rows) {
							if (
								!bodyhabits.find(
									(localBodyhabit) => localBodyhabit._id === bodyhabit._id
								)
							) {
								await firstValueFrom(
									this._bodyhabitService.delete(bodyhabit)
								);
							}
						}

						for (const bodyhabit of bodyhabits) {
							const localBodyhabit = this.rows.find(
								(localBodyhabit) => localBodyhabit._id === bodyhabit._id
							);

							if (localBodyhabit) {
								this._core.copy(bodyhabit, localBodyhabit);

								await firstValueFrom(
									this._bodyhabitService.update(localBodyhabit)
								);
							} else {
								this._preCreate(bodyhabit);

								await firstValueFrom(
									this._bodyhabitService.create(bodyhabit)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(bodyhabit: Bodyhabit): void {
		delete bodyhabit.__created;
	}
}
