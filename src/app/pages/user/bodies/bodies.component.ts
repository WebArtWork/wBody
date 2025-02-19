import { Component } from '@angular/core';
import { BodyService } from 'src/app/modules/body/services/body.service';
import { Body } from 'src/app/modules/body/interfaces/body.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { bodyFormComponents } from 'src/app/modules/body/formcomponents/body.formcomponents';
import { Router } from '@angular/router';

@Component({
  templateUrl: './bodies.component.html',
  styleUrls: ['./bodies.component.scss'],
  standalone: false
})
export class BodiesComponent {
  get bodies(): Body[] {
    return this._bodyService.body;
  }
  
 
  form: FormInterface = this._form.getForm('body', bodyFormComponents);
	isMenuOpen = false;

  constructor(
		private _bodyService: BodyService,
		private _form: FormService,
		private _router: Router,) { }
  create(): void {
		this._form.modal<Body>(this.form, {
			label: 'Create',
			click: (created: unknown, close: () => void) => {
				this._bodyService.create(created as Body).subscribe((bodies) => {
					close();
					this._router.navigate(['/myprofile', bodies._id]);
				});
			}
		})
	}
}
