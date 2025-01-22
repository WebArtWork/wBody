import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BodystressService } from '../../services/bodystress.service';
import { Bodystress } from '../../interfaces/bodystress.interface';

@Component({
	selector: 'bodystress-selector',
	templateUrl: './bodystress-selector.component.html',
	styleUrls: ['./bodystress-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Bodystress[] {
		return this._bodystressService.bodystresss;
	}

	constructor(private _bodystressService: BodystressService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
