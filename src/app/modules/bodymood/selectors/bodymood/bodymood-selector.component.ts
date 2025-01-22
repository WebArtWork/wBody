import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BodymoodService } from '../../services/bodymood.service';
import { Bodymood } from '../../interfaces/bodymood.interface';

@Component({
	selector: 'bodymood-selector',
	templateUrl: './bodymood-selector.component.html',
	styleUrls: ['./bodymood-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Bodymood[] {
		return this._bodymoodService.bodymoods;
	}

	constructor(private _bodymoodService: BodymoodService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
