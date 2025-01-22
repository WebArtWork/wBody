import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BodyfoodService } from '../../services/bodyfood.service';
import { Bodyfood } from '../../interfaces/bodyfood.interface';

@Component({
	selector: 'bodyfood-selector',
	templateUrl: './bodyfood-selector.component.html',
	styleUrls: ['./bodyfood-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Bodyfood[] {
		return this._bodyfoodService.bodyfoods;
	}

	constructor(private _bodyfoodService: BodyfoodService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
