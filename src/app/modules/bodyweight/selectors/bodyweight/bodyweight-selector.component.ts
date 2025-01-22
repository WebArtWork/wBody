import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BodyweightService } from '../../services/bodyweight.service';
import { Bodyweight } from '../../interfaces/bodyweight.interface';

@Component({
	selector: 'bodyweight-selector',
	templateUrl: './bodyweight-selector.component.html',
	styleUrls: ['./bodyweight-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Bodyweight[] {
		return this._bodyweightService.bodyweights;
	}

	constructor(private _bodyweightService: BodyweightService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
