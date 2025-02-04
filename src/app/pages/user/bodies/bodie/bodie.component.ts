import { Component, Input } from '@angular/core';
import { Body } from 'src/app/modules/body/interfaces/body.interface';

@Component({
  selector: 'app-bodie',
  standalone: false,
  templateUrl: './bodie.component.html',
  styleUrl: './bodie.component.scss'
})
export class BodieComponent {
  @Input() bodie: Body;
}
