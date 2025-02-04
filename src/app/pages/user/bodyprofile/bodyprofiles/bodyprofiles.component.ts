import { Component, Input } from '@angular/core';
import { Body } from 'src/app/modules/body/interfaces/body.interface';

@Component({
  selector: 'app-bodyprofiles',
  standalone: false,
  
  templateUrl: './bodyprofiles.component.html',
  styleUrl: './bodyprofiles.component.scss'
})
export class BodyprofilesComponent {
@Input() bodyprofiles: Body;
}
