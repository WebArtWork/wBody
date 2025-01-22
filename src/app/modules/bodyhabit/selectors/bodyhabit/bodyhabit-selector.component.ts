import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BodyhabitService } from '../../services/bodyhabit.service';
import { Bodyhabit } from '../../interfaces/bodyhabit.interface';

@Component({
	selector: 'bodyhabit-selector',
	templateUrl: './bodyhabit-selector.component.html',
	styleUrls: ['./bodyhabit-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Bodyhabit[] {
		return this._bodyhabitService.bodyhabits;
	}

	constructor(private _bodyhabitService: BodyhabitService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
