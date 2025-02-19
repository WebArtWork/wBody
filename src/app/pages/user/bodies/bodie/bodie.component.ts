import { Component, Input } from '@angular/core';
import { Body } from 'src/app/modules/body/interfaces/body.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { bodyFormComponents } from 'src/app/modules/body/formcomponents/body.formcomponents';
import { BodyService } from 'src/app/modules/body/services/body.service';
import { AlertService, CoreService } from 'wacom';

@Component({
  selector: 'app-bodie',
  standalone: false,
  templateUrl: './bodie.component.html',
  styleUrl: './bodie.component.scss'
})
export class BodieComponent {
  @Input() bodie: Body;

  constructor(
    private _translate: TranslateService,
    private _bodyService: BodyService,
    private _alert: AlertService,
    private _form: FormService,
    private _core: CoreService
  ) {}

  form: FormInterface = this._form.getForm('bodie', bodyFormComponents);

  update (doc: Body): void  {
    this._form
      .modal<Body>(this.form, [], doc)
      .then((updated: Body) => {
        this._core.copy(updated, doc);

        this._bodyService.update(doc);
      });
  }

  delete (doc: Body): void  {
    this._alert.question({
      text: this._translate.translate(
        'Common.Are you sure you want to delete this Body?'
      ),
      buttons: [
        {
          text: this._translate.translate('Common.No')
        },
        {
          text: this._translate.translate('Common.Yes'),
          callback: (): void => {
            this._bodyService.delete(doc);
          }
        }
      ]
    });


}
}
