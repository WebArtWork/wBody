import { Component } from '@angular/core';
import { BodyService } from 'src/app/modules/body/services/body.service';
import { Body } from 'src/app/modules/body/interfaces/body.interface';

@Component({
  templateUrl: './bodies.component.html',
  styleUrls: ['./bodies.component.scss'],
  standalone: false
})
export class BodiesComponent {
  get bodies(): Body[] {
    return this._bodyService.body;
  }
  
  isMenuOpen = false;

  constructor(private _bodyService: BodyService) {}
}
