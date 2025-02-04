import { Component, Input } from '@angular/core';
import { Body } from 'src/app/modules/body/interfaces/body.interface';

@Component({
  selector: 'app-createbodys',
  standalone: false,
  
  templateUrl: './createbodys.component.html',
  styleUrl: './createbodys.component.scss'
})
export class CreatebodysComponent {
@Input() createbodys: Body;
}
