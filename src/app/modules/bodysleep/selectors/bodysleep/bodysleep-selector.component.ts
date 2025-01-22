import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BodysleepService } from '../../services/bodysleep.service';
import { Bodysleep } from '../../interfaces/bodysleep.interface';

@Component({
	selector: 'bodysleep-selector',
	templateUrl: './bodysleep-selector.component.html',
	styleUrls: ['./bodysleep-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Bodysleep[] {
		return this._bodysleepService.bodysleeps;
	}

	constructor(private _bodysleepService: BodysleepService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
