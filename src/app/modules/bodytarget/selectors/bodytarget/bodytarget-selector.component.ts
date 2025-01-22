import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BodytargetService } from '../../services/bodytarget.service';
import { Bodytarget } from '../../interfaces/bodytarget.interface';

@Component({
	selector: 'bodytarget-selector',
	templateUrl: './bodytarget-selector.component.html',
	styleUrls: ['./bodytarget-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Bodytarget[] {
		return this._bodytargetService.bodytargets;
	}

	constructor(private _bodytargetService: BodytargetService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
