import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BodyService } from '../../services/body.service';
import { Body } from '../../interfaces/body.interface';

@Component({
	selector: 'body-selector',
	templateUrl: './body-selector.component.html',
	styleUrls: ['./body-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Body[] {
		return this._bodyService.bodys;
	}

	constructor(private _bodyService: BodyService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
