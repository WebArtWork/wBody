import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BodyexerciseService } from '../../services/bodyexercise.service';
import { Bodyexercise } from '../../interfaces/bodyexercise.interface';

@Component({
	selector: 'bodyexercise-selector',
	templateUrl: './bodyexercise-selector.component.html',
	styleUrls: ['./bodyexercise-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Bodyexercise[] {
		return this._bodyexerciseService.bodyexercises;
	}

	constructor(private _bodyexerciseService: BodyexerciseService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
